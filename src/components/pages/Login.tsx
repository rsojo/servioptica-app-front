// src/components/Login.tsx
import React from "react";
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

  const navetgate = useNavigate();

  const handleLogin = (value: any) => {
    if (value)
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
            navetgate("/home-admin");
          }
        }
      );
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
      <LoginForm onCallBack={handleLogin} />
    </ContainerAtom>
  );
};

export default Login;
