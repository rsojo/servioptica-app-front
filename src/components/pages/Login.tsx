// src/components/Login.tsx
import React, { useState } from "react";
import ContainerAtom from "../atoms/container";
import { LoginForm } from "../organisms/formLogin/main";
import { Navigate, useNavigate } from "react-router-dom";
import {
  assignPassword,
  loginUser,
  oidcStart,
  sendOtp,
  verifyOtp,
} from "../../api/Auth";
import { persistAppStoreAtom } from "../../store/Auth";
import { useAtom } from "jotai";
import { useMessage } from "../../hooks/useMessage";


const Login: React.FC = () => {
  const [appStore, setAppStore] = useAtom(persistAppStoreAtom);
  const { errorSnackMessage, successSnackMessage } = useMessage();

  const [tokenPass, setTokenPass] = useState<string>("");
  const [externalEmail, setExternalEmail] = useState<string | null>(null);

  const [step, setStep] = useState(1);
  const navetgate = useNavigate();

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
    if (value && step === 1) {
      loginUser({ document: value.document, password: value.password }).then(
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
        }
      );
    }

    if (value && step === 2) {
      sendOtp({ document: value.document }).then((response) => {
        if (response.error) {
          errorSnackMessage(response.message);
        }
        if (!response.error) {
          const email = response.data?.email;
          setExternalEmail(email || null);
          successSnackMessage(String(response.message));
          setStep(3);
        }
      });
    }

    if (value && step === 3) {
      verifyOtp({ otp: value.otp, document: value.document }).then((response) => {
        if (response.error) {
          errorSnackMessage(response.message);
          return;
        }
        if (!response.error && response.data) {
          setTokenPass(response.data.assignToken);
          successSnackMessage(String(response.message));
          setStep(4);
        }
      });
    }

    if (value && step === 4) {
      if (value.password_1 !== value.password_2) {
        errorSnackMessage("!Las claves no coinciden!");
      } else {
        assignPassword({
          assignToken: tokenPass,
          document: value.document,
          password: value.password_1,
        }).then((response: any) => {
          if (response.error) {
            errorSnackMessage(response.message);
          }
          if (!response.error) {
            successSnackMessage(String(response.message));
            setStep(1);
          }
        });
      }
    }
  };

  if (appStore.auth && !appStore.auth.admin) {
    return <Navigate to="/dashboard" replace />;
  }
  if (appStore.auth && appStore.auth.admin) {
    return <Navigate to="/dashboard-admin" replace />;
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
      <LoginForm
        onCallBack={handleLogin}
        step={step}
        setStep={setStep}
        externalEmail={externalEmail}
        onOpenIdLogin={handleOidcLogin}
      />

    </ContainerAtom>
  );
};

export default Login;
