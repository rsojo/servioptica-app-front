// src/components/Login.tsx
import React, { useState } from "react";
import ContainerAtom from "../atoms/container";
import { LoginForm } from "../organisms/formLogin/main";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/Auth";
import { persistAppStoreAtom } from "../../store/Auth";
import { useAtom } from "jotai";
import { useMessage } from "../../hooks/useMessage";

const Login: React.FC = () => {
  const [, setAppStore] = useAtom(persistAppStoreAtom);
  const { errorSnackMessage, successSnackMessage } = useMessage();
  const [step, setStep] = useState(1);

  const navetgate = useNavigate();

  const handleLogin = (value: any) => {
    if (value && step === 1) {
      // Login
      loginUser({ document: value.document, password: value.password }).then(
        (response) => {
          if (response.error) {
            errorSnackMessage(response.message);
          }
          if (response.data?.access_token) {
            setAppStore({
              auth: { access_token: response.data.access_token, rol: "admin" },
              user: null,
            });
            successSnackMessage(String(response.message));
            navetgate("/dashboard-admin");
          }
        }
      );
    }
    if (value && step === 2) {
      // Otp
      // const handkeVerifyOtp = (value: string) => {
      //   console.log("[handkeVerifyOtp]", value);
      //   verifyOtp({ otp: value, email: email }).then((response) => {
      //     if (response.error) {
      //       errorSnackMessage(response.message);
      //     }
      //     if (!response.error) {
      //       successSnackMessage(String(response.message));
      //       setStep(4);
      //     }
      //   });
      // };
    }
    if (value && step === 3) {
      // Passbord
    }
  };

  return (
    <ContainerAtom
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: 500,
        height: "calc(100vh - 260px)",
      }}
    >
      <LoginForm onCallBack={handleLogin} step={step} setStep={setStep} />
    </ContainerAtom>
  );
};

export default Login;
