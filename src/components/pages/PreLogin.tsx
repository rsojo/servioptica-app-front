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
  register,
  sendOtp,
  verifyOtp,
} from "../../api/Auth";
import { OptionsSelectAtomIt } from "../atoms";
import { CheckClientData, CheckClientResponse } from "../../api/Auth/type";
import { useAtom } from "jotai";
import { persistAppStoreAtom } from "../../store/Auth";
import { LoginForm } from "../organisms/formLogin/main";

const PreLogin: React.FC = () => {
  const [, setAppStore] = useAtom(persistAppStoreAtom);

  const [step, setStep] = useState(1);
  const [nit, setNit] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [tokenPass, setTokenPass] = useState<string>("");
  const [sede, setSede] = useState<OptionsSelectAtomIt[] | null>(null);
  const [checkClientData, setCheckClientData] =
    useState<CheckClientResponse | null>(null);
  const navetgate = useNavigate();

  const { errorSnackMessage, successSnackMessage } = useMessage();

  const handleLogin = (value: any) => {
    setAppStore({
      auth: null,
      user: null,
    })

    if (value && step === 1) {
      // Form tipo A (NIT)
      console.log('[document]',document)
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
    if (value && step === 3) {
      // Form Tipo C (OTP)
      handkeVerifyOtp(value);
    }
    if (value && step === 4) {
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
          }
          if (response.data?.access_token) {
            const authData = {
              access_token: response.data.access_token,
              rol: response.data.admin ? "admin" : "user",
              admin: response.data.admin,
              document :nit,
            };
            // console.log("[handleLogin] [authData]", authData);
            setAppStore({
              auth: authData,
              user: null,
            });
            successSnackMessage(String(response.message));
            if (response.data.admin) {
              navetgate("/dashboard-admin");
            } else {
              navetgate("/dashboard");
            }
          }
        }
      );
    }
  };

  const handkeVerifyOtp = (value: string) => {
    verifyOtp({ otp: value, email: email })
      .then((response) => {
        if (response.error || response.data === null) {
          errorSnackMessage(response.message);
        }
        if (!response.error && response.data) {
          setTokenPass(response.data.assignToken);
          successSnackMessage(String(response.message));
          setStep(4);
        }
      })
      .catch((error) => errorSnackMessage(String(error.message)));
  };

  const handleCheckClient = (value: { document: string }) => {
    checkClient({ document: value.document })
      .then((response) => {
        console.log("[handleCheckClient] [response]", response);
        if (response.error || response.code === 500) {
          errorSnackMessage(response.message);
          return
        }
        successSnackMessage(String(response.message));
        setCheckClientData(response);

        if (response.code === 302) {
            setStep(5); 
            return;
          };

        if (response.code === 202) {
          const data = response.data as CheckClientData[];
          if (data.length > 1) {
            const preData = data.map((item: any) => ({
              option: item.email,
              value: item.email,
            }));
            setSede(preData as OptionsSelectAtomIt[]);
            setStep(2);
            return;
          } else if (data.length === 1) {
            setEmail(data[0].email);
            sendOtp({ email: data[0].email }).then((otpr) =>
              successSnackMessage(String(otpr.message))
            );
            setStep(3);
            return
          }
        }
        if (response.code === 208) {
          const data = response.data as CheckClientData[];
          if (data[0].status === "Inactive") {
            setEmail(data[0].email);
            sendOtp({ email: data[0].email }).then((otpr) =>
              successSnackMessage(String(otpr.message))
            );
            setStep(3);
          } else
          if (data[0].status === "Active") {
            //navetgate("/login");
            setStep(5);
          }
          return
        }
      })
      .catch((error) => {
        errorSnackMessage(String(error.message));
      });
  };

  const handleRegister = (findSede?: CheckClientData) => {
    register({ ...findSede! })
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
      });
  };

  if(step === 5 && nit) {
    return (
    <ContainerAtom
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: 500,
        height: "calc(100vh - 260px)",
      }}
    >    
      <LoginForm document={nit} onCallBack={handleLogin} step={1} setStep={setStep} /> 
    </ContainerAtom>
    )
  }

  return (
    <ContainerAtom
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: 500,
        height: "calc(100vh - 260px)",
      }}
    >
      <PreLoginForm
        setNit={setNit}
        onCallBack={handleLogin}
        step={step}
        nit={nit}
        sede={sede}
      />
      {step === 3 && (
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
