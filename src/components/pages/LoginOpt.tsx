// src/components/Login.tsx
import React, { useEffect, useState } from "react";
import ContainerAtom from "../atoms/container";
import { OtpCodeLightBox } from "../organisms/formLogin/otp";
import { LoginOptForm } from "../organisms/formLogin/optics";
import { useNavigate } from "react-router-dom";

const LoginOpt: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>('');
  const navetgate = useNavigate()

  useEffect(()=>{console.log(formData)}, [formData])

  return (
    <ContainerAtom
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: 500,
        height: "calc(100vh - 347px)",
      }}
    >
      <LoginOptForm
        setStep={setStep}
        setFormData={setFormData}
      />

      {step === 3 && (
        <OtpCodeLightBox
          onCancelBack={() => setStep(1)}
          onCallBack={(value) => {
            console.log("onCallBack", value);
            if (value.length > 0) {
              navetgate('/dashboard-opt?id=987')
              setStep(1);
            }
          }}
        />
      )}
    </ContainerAtom>
  );
};

export default LoginOpt;
