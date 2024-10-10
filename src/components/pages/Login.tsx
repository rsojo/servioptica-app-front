// src/components/Login.tsx
import React, { useState } from "react";
import ContainerAtom from "../atoms/container";
import GridAtom from "../atoms/grid";
import TextAtom from "../atoms/text";
import { BASE_COLORS } from "../../style/constants";
import BkLogin from "../../assets/img/bkLogin.webp";
import { SpaceAtom } from "../atoms/space";
import { FormModule } from "../molecules/form";
import FieldBuiltData from "../organisms/formLogin/data/fieldBuiltDataNit.json";
import FieldBuiltDataSede from "../organisms/formLogin/data/fieldBuiltDataNitSede.json";
import { GroupFields } from "../molecules/form/type";
import { OtpCodeLightBox } from "../organisms/formLogin/otp";

const Login: React.FC = () => {
  const [step, setStep] = useState(1);
  const [nit, setNit] = useState<string>("");

  const updateDefaultValues = (
    data: GroupFields[],
    groupName: string,
    fieldName: string,
    newValue: string
  ) => {
    const newData = data.map((group) => {
      if (group.groupName === groupName) {
        const updatedFields = group.fields.map((field) => {
          if (field.name === fieldName) {
            return { ...field, default: newValue };
          }
          return field;
        });
        return { ...group, fields: updatedFields };
      }
      return group;
    });
    return newData;
  };

  return (
    <ContainerAtom
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: 500,
        height: "calc(100vh - 347px)",
      }}
    >
      <GridAtom
        alignItems="center"
        justifyContent="flex-start"
        style={{
          position: "absolute",
          top: 0,
          left: "-5%",
          width: "105%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <img
          src={BkLogin}
          alt="Fondo de pantalla"
          width={1920}
          height={1080}
          style={{
            objectFit: "cover",
            objectPosition: "center bottom",
            width: "100%",
            height: "100%",
            position: "absolute",
            bottom: 0,
          }}
        />
      </GridAtom>
      <GridAtom alignItems="center">
        <GridAtom gap={5} style={{ width: "100%", maxWidth: 320 }}>
          <TextAtom
            style={{
              color: BASE_COLORS.blue,
              textAlign: "center",
              width: "100%",
            }}
          >
            Inicio de sesión ópticas
          </TextAtom>
          <SpaceAtom v={8} />
          {step === 1 ? (
            <FormModule
              actionBtnLabel="Validar"
              groupsFields={FieldBuiltData}
              onCallBack={(value) => {
                setStep(2);
                setNit(String((value as any).login_nit));
                console.log(value);
              }}
            />
          ) : (
            <FormModule
              actionBtnLabel="Enviar código de validación"
              groupsFields={updateDefaultValues(
                FieldBuiltDataSede,
                "login",
                "login_nit",
                nit
              )}
              onCallBack={(value) => {
                setStep(3);
                console.log(value);
              }}
            />
          )}
        </GridAtom>
      </GridAtom>
      {step === 3 && (
        <OtpCodeLightBox
          onCancelBack={() => setStep(1)}
          onCallBack={(value) => {
            console.log("onCallBack", value);
            if (value.length > 0) {
              setStep(1);
            }
          }}
        />
      )}
    </ContainerAtom>
  );
};

export default Login;
