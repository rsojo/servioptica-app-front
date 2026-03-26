// src/components/Login.tsx
import React, { useState } from "react";
import ContainerAtom from "../atoms/container";
import { OtpCodeLightBox } from "../organisms/formLogin/otp";
import { useNavigate } from "react-router-dom";
import { PreLoginForm } from "../organisms/formLogin/preLogin";
import { useMessage } from "../../hooks/useMessage";
import {
  assignPassword,
  checkClient,
  loginUser,
  oidcStart,
  register,
  sendOtp,
  verifyOtp,
} from "../../api/Auth";
import { OptionsSelectAtomIt } from "../atoms";
import { CheckClientData, CheckClientResponse } from "../../api/Auth/type";
import { useAtom } from "jotai";
import { persistAppStoreAtom } from "../../store/Auth";
import { LoginForm } from "../organisms/formLogin/main";
import { RecoverPasswordForm } from "../organisms/formLogin/recoverPassword";

const USE_CHECKCLIENT_FLOW = false;

const PreLogin: React.FC = () => {
  const [, setAppStore] = useAtom(persistAppStoreAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [step, setStep] = useState(1);
  const [nit, setNit] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [tokenPass, setTokenPass] = useState<string>("");
  const [sede, setSede] = useState<OptionsSelectAtomIt[] | null>(null);
  const [checkClientData, setCheckClientData] =
    useState<CheckClientResponse | null>(null);
  const navetgate = useNavigate();

  const { errorSnackMessage, successSnackMessage } = useMessage();

  const handleOidcLogin = async () => {
    const returnTo = `${window.location.origin}/oidc/callback`;
    const response = await oidcStart(returnTo);

    if (response.error || !response.data?.authorization_url) {
      errorSnackMessage(response.message || "No fue posible iniciar OpenID.");
      return;
    }

    window.location.assign(response.data.authorization_url);
  };

  const handleLogin = (value: any) => {
    if (!USE_CHECKCLIENT_FLOW && value && step === 1) {
      setIsLoading(true);
      setAppStore({
        auth: null,
        user: null,
      });

      loginUser({ document: value.document, password: value.password })
        .then((response) => {
          if (response.error) {
            errorSnackMessage(response.message);
            if (response.code === 403 || response.code === 405) {
              handleOidcLogin();
            }
            return;
          }

          if (response.data?.access_token) {
            const authData = {
              access_token: response.data.access_token,
              rol: "user",
              admin: false,
              document: value.document,
              auth_source: "local_client",
            };

            setAppStore({
              auth: authData,
              user: null,
            });

            successSnackMessage(String(response.message));
            navetgate("/dashboard");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });

      return;
    }

    setIsLoading(true);
    setAppStore({
      auth: null,
      user: null,
    });

    if (value && step === 1) {
      // Form tipo A (NIT)
      setNit(value.document);
      handleCheckClient(value);
    }
    if (value && step === 2 && checkClientData) {
      // Form tipo B (SEDE)
      const findSede = checkClientData.data?.find(
        (i) => i.email === value.login_sede
      );
      handleRegister(findSede);
    }
    if (value && (step === 3 || step === 7)) {
      // Form Tipo C (OTP)
      handkeVerifyOtp(value, step);
    }
    if (value && (step === 4 || step === 6)) {
      // Form Tipo D (PASSWORD)
      const { password_1, password_2 } = value;
      if (password_1 === password_2) {
        assignPassword({
          assignToken: tokenPass,
          document: nit,
          password: password_1,
        }).then((response) => {
          if (response.error) {
            errorSnackMessage(response.message);
          }
          if (!response.error) {
            successSnackMessage(String(response.message));
            //navetgate("/login");
            setStep(5);
          }
        }).finally(() => {
          setIsLoading(false);
        });
      } else {
        errorSnackMessage("Las contraseñas no coinciden");
      }
    }
    if (value && step === 5 && nit) {
      // Form tipo E (LOGIN)
      loginUser({ document: nit, password: value.password }).then(
        (response) => {
          if (response.error) {
            errorSnackMessage(response.message);
            if (response.code === 403 || response.code === 405) {
              handleOidcLogin();
            }
            return;
          }
          if (response.data?.access_token) {
            const authData = {
              access_token: response.data.access_token,
              rol: "user",
              admin: false,
              document: nit,
              auth_source: "local_client",
            };
            // console.log("[handleLogin] [authData]", authData);
            setAppStore({
              auth: authData,
              user: null,
            });
            successSnackMessage(String(response.message));
            navetgate("/dashboard");
          }
        }
      );
    }
    // recovery password
    if (value && step === 6 && nit) {
      setStep(5);
    }
  };

  if (!USE_CHECKCLIENT_FLOW) {
    return (
      <ContainerAtom
        style={{
          position: "relative",
          overflowY: "auto",
          minHeight: "calc(100vh - 260px)",
          height: "auto",
          paddingBottom: 24,
        }}
      >
        <LoginForm
          onCallBack={handleLogin}
          step={step}
          setStep={setStep}
          externalEmail={email}
          onOpenIdLogin={handleOidcLogin}
        />
      </ContainerAtom>
    );
  }

  const handkeVerifyOtp = (value: string, step: number) => {
    let data: { otp: string; email?: string; document?: string } = { otp: value, document: nit };
    if (step === 7) {
      data = { otp: value, document: nit };
    }
    verifyOtp(data)
      .then((response) => {
        if (response.error || response.data === null) {
          errorSnackMessage(response.message);
          return;
        }
        if (!response.error && response.data) {
          setTokenPass(response.data.assignToken);
          successSnackMessage(String(response.message));
          setStep(()=>(step === 7 ? 6 : 4));
          return;
        }
      })
      .catch((error) => errorSnackMessage(String(error.message))).finally(() => {
        setIsLoading(false);
      })
  };

  const handleCheckClient = (value: { document: string }) => {
    checkClient({ document: value.document })
      .then((response) => {
        // Handle various response codes
        if (response.error || response.code === 500 || response.code === 404) {
          errorSnackMessage(response.message);
          return;
        }
        successSnackMessage(String(response.message));
        setCheckClientData(response);
        
        if (response.code === 302) {
          setStep(5);
          return;
        }
        const data = response.data as CheckClientData[];
        setEmail(data[0].email);
        
        if (response.code === 202) {
          if (data.length > 1) {
            const preData = data.map((item: any) => ({
              option: item.email,
              value: item.email,
            }));
            setSede(preData as OptionsSelectAtomIt[]);
            setStep(2);
            return;
          } else if (data.length === 1) {
            // Auto register and send OTP
            sendOtp({ document: data[0].document }).then((otpr) =>
              successSnackMessage(String(otpr.message))
            );
            setStep(3);
            return;
          }
        }
        if (response.code === 208) {
          if (data[0].status === "Inactive") {
            sendOtp({ document: data[0].document }).then((otpr) =>
              successSnackMessage(String(otpr.message))
            );
            setStep(3);
          } else if (data[0].status === "Active") {
            //navetgate("/login");
            setStep(5);
          }
          return;
        }
      })
      .catch((error) => {
        errorSnackMessage(String(error.message));
      }).finally(() => {
        setIsLoading(false);
      })
    ;
  };

  const handleRegister = (findSede?: CheckClientData) => {
    register({ ...findSede!, document: nit, email: findSede?.email || email })
      .then((response) => {
        if (response.error) {
          errorSnackMessage(response.message);
        }
        if (response.data) {
          successSnackMessage(String(response.message));
          setEmail(findSede?.email!);
          setStep(3);
        }
      })
      .catch((error) => {
        errorSnackMessage(String(error.message));
      }).finally(() => {
        setIsLoading(false);
      })
    ;
  };

  if (step === 5 && nit) {
    return (
      <ContainerAtom
        style={{
          position: "relative",
          overflowY: "auto",
          minHeight: "calc(100vh - 260px)",
          height: "auto",
          paddingBottom: 24,
        }}
      >
        <LoginForm
          document={nit}
          onCallBack={handleLogin}
          step={1}
          setStep={setStep}
          externalEmail={email}
          onOpenIdLogin={handleOidcLogin}
        />
      </ContainerAtom>
    );
  }

  if (step === 6 && nit && tokenPass) {
    return (
      <ContainerAtom
        style={{
          position: "relative",
          overflowY: "auto",
          minHeight: "calc(100vh - 260px)",
          height: "auto",
          paddingBottom: 24,
        }}
      >
        <RecoverPasswordForm
          nit={nit}
          onCallBack={handleLogin}
          tokenPass={tokenPass}
        />
      </ContainerAtom>
    );
  }

  return (
    <ContainerAtom
      style={{
        position: "relative",
        overflowY: "auto",
        minHeight: "calc(100vh - 260px)",
        height: "auto",
        paddingBottom: 24,
      }}
    >
      <PreLoginForm
        setNit={setNit}
        onCallBack={handleLogin}
        step={step}
        nit={nit}
        sede={sede}
        isLoading={isLoading}
      />
      {(step === 7) && (
        <OtpCodeLightBox
          email={email}
          document={nit}
          onCancelBack={() => setStep(5)}
          onCallBack={(value) => {
            handleLogin(value);
          }}
        />
      )}
      {(step === 3) && (
        <OtpCodeLightBox
          email={email}
          onCancelBack={() => setStep(1)}
          onCallBack={(value) => {
            handleLogin(value);
          }}
        />
      )}
    </ContainerAtom>
  );
};

export default PreLogin;
