// src/components/Login.tsx
import React, { useEffect, useState } from "react";
import ContainerAtom from "../atoms/container";
import { OtpCodeLightBox } from "../organisms/formLogin/otp";
import { useNavigate } from "react-router-dom";
import { LoginClientForm } from "../organisms/formLogin/client";

const Login: React.FC = () => {
  const [step, setStep] = useState(1);
  const [nit, setNit] = useState<string>("");
  const [formData, setFormData] = useState<any>('');
  const navetgate = useNavigate()

  useEffect(()=>{console.log(formData)}, [formData])

  return (
    <ContainerAtom
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: 500,
        height: "calc(100vh - 260px)",
      }}
    >
      <LoginClientForm 
        setStep={setStep}
        setNit={setNit}
        setFormData={setFormData}
        step={step}
        nit={nit}
      />
      {step === 3 && (
        <OtpCodeLightBox
          onCancelBack={() => setStep(1)}
          onCallBack={(value) => {
            console.log("onCallBack", value);
            if (value.length > 0) {
              navetgate('/dashboard?id=123')
              setStep(1);
            }
          }}
        />
      )}
    </ContainerAtom>
  );
};

export default Login;
