// src/components/Login.tsx
import React, { useState } from "react";
import ContainerAtom from "../atoms/container";
import { LoginForm } from "../organisms/formLogin/main";
import { useNavigate } from "react-router-dom";
import {
  assignPasswordByEmail,
  loginUser,
  sendOtp,
  verifyOtp,
} from "../../api/Auth";
import { persistAppStoreAtom } from "../../store/Auth";
import { useAtom } from "jotai";
import { useMessage } from "../../hooks/useMessage";

const Login: React.FC = () => {
  const [, setAppStore] = useAtom(persistAppStoreAtom);
  const { errorSnackMessage, successSnackMessage } = useMessage();
  const [tokenPass, setTokenPass] = useState<string>("");

  const [step, setStep] = useState(1);

  const navetgate = useNavigate();

  const handleLogin = (value: any) => {
    if (value && step === 1) {
      // value: {document, password}
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
      // value: {email}
      sendOtp({ email: value.email }).then((response) => {
        if (response.error) {
          errorSnackMessage(response.message);
        }
        if (!response.error) {
          successSnackMessage(String(response.message));
          setStep(3);
        }
      });
    }
    if (value && step === 3) {
      // value: {email & otp}
      verifyOtp({ otp: value.otp, email: value.email }).then((response) => {
        if (response.error) {
          errorSnackMessage(response.message);
        }
        console.log(response);
        if (!response.error && response.data) {
          setTokenPass(response.data.assignToken);
          successSnackMessage(String(response.message));
          setStep(4);
        }
      });
    }
    if (value && step === 4) {
      // New Passbord | value: {password_1, password_2, email}
      if (value.password_1 !== value.password_2) {
        errorSnackMessage("!Las claves no coinciden!");
      } else {
        assignPasswordByEmail({
          assignToken: tokenPass,
          email: value.email,
          password: value.password_1,
        }).then((response) => {
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
