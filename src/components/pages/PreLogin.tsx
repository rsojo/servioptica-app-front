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
  register,
  sendOtp,
  verifyOtp,
} from "../../api/Auth";
import { OptionsSelectAtomIt } from "../atoms";
import { CheckClientData, CheckClientResponse } from "../../api/Auth/type";

const PreLogin: React.FC = () => {
  const [step, setStep] = useState(1);
  const [nit, setNit] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [sede, setSede] = useState<OptionsSelectAtomIt[] | null>(null);
  const [checkClientData, setCheckClientData] =
    useState<CheckClientResponse | null>(null);
  const navetgate = useNavigate();

  const { errorSnackMessage, successSnackMessage } = useMessage();

  const handleLogin = (value: any) => {
    console.log(step, value);

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
      handleRegister(findSede!);
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
          document: nit,
          password: password_1,
        }).then((response) => {
          if (response.error) {
            errorSnackMessage(response.message);
          }
          if (!response.error) {
            successSnackMessage(String(response.message));
            navetgate("/login");
          }
        });
      } else {
        errorSnackMessage("Las contraseñas no coinciden");
      }
    }
  };

  const handkeVerifyOtp = (value: string) => {
    console.log("[handkeVerifyOtp]", value);
    verifyOtp({ otp: value, email: email }).then((response) => {
      if (response.error) {
        errorSnackMessage(response.message);
      }
      if (!response.error) {
        successSnackMessage(String(response.message));
        setStep(4);
      }
    });
  };

  const handleCheckClient = (value: { document: string }) => {
    checkClient({ document: value.document })
      .then((response) => {
        console.log("[checkClient]", response.code);
        if (response.error) {
          errorSnackMessage(response.message);
        }
        successSnackMessage(String(response.message));
        setCheckClientData(response);

        if (response.code === 302) navetgate("/login");

        if (response.code === 202) {
          const data = response.data as CheckClientData[];
          if (data.length > 1) {
            const preData = data.map((item: any) => ({
              option: item.email,
              value: item.email,
            }));
            setSede(preData as OptionsSelectAtomIt[]);
            setStep(2);
          } else if (data.length === 1) {
            setEmail(data[0].email);
            sendOtp({ email: data[0].email }).then((otpr) =>
              successSnackMessage(String(otpr.message))
            ); // TODO: Cambiar a correo del cliente data[0].email
            setStep(3);
          }
        }
        if (response.code === 208) {
          const data = response.data as CheckClientData[];
          console.log("[response.code === 208]", response);
          if (data[0].status === "Inactive") {
            setEmail(data[0].email);
            sendOtp({ email: data[0].email }).then((otpr) =>
              successSnackMessage(String(otpr.message))
            ); // TODO: Cambiar a correo del cliente data[0].email
            setStep(3);
          }
          if (data[0].status === "Active") {
            navetgate("/login");
          }
        }
      })
      .catch((error) => {
        errorSnackMessage(error.message);
      });
  };

  const handleRegister = (findSede: CheckClientData) => {
    register({ ...findSede! })
      .then((response) => {
        if (response.error) {
          errorSnackMessage(response.message);
        }
        if (response.data) {
          successSnackMessage(String(response.message));
          setEmail(findSede.email);
          setStep(3);
        }
      })
      .catch((error) => {
        errorSnackMessage(error.message);
      });
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
