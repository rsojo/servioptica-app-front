import GridAtom from "../../../atoms/grid";
import { SpaceAtom } from "../../../atoms/space";
import TextAtom from "../../../atoms/text";
import { FormModule } from "../../../molecules/form";
import BkLogin from "../../../../assets/img/bkLogin.webp";
import { BASE_COLORS } from "../../../../style/constants";
import fieldBuiltDataOpt from "../data/fieldBuiltDataOpt.json";
import fieldBuiltDataOptAdmin from "../data/fieldBuiltDataOptAdmin.json";
import fieldBuiltDataLoginPassword from "../data/fieldBuiltDataLoginPassword.json";
import { PreDataType } from "../../../molecules/form/type";
import fieldBuiltDataNewPassw from "../data/fieldBuiltDataNewPassw.json";
import fieldBuiltDataGetEmail from "../data/fieldBuiltDataGetEmail.json";
import { ButtonAtom } from "../../../atoms";
import { OtpCodeLightBox } from "../otp";
import { useMemo, useState } from "react";

export const LoginForm = ({
  step,
  onCallBack,
  setStep,
  isAdmin = false,
  document
}: {
  step: number;
  onCallBack: (value: PreDataType) => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isAdmin?: boolean;
  document?: string;
}) => {
  const [email, setEmail] = useState<string | null>(null)

  const handleBuildData = useMemo(() => {
    if (isAdmin) {
      return fieldBuiltDataOptAdmin;
    } else {
      if(document) {
        console.log("[handleBuildData] [document]", document)
        return fieldBuiltDataLoginPassword
      }
      return fieldBuiltDataOpt.map((i) => {
        return {
          ...i,
          fields: i.fields.map((item) =>
            item.name === "document" ? { ...item, default: document } : item
          ),
        };
      });
    }
  }, [document, isAdmin]);
  
  return (
    <>
      <GridAtom
        alignItems="center"
        justifyContent="flex-start"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
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
            objectPosition: "center top",
            width: "102%",
            height: "100%",
            position: "absolute",
            bottom: 0,
          }}
        />
      </GridAtom>
      <GridAtom alignItems="center">
        <GridAtom gap={5} style={{ width: "100%", maxWidth: 447 }}>
          <TextAtom
            style={{
              color: BASE_COLORS.blue,
              textAlign: "center",
              width: "100%",
              fontWeight: 600,
            }}
          >
            Inicio de sesión {isAdmin?"administrador":"ópticas"}
          </TextAtom>
          <SpaceAtom v={8} />
          {step === 1 && (
            <GridAtom style={{ width: "100%" }} alignItems="center" gap={4}>
              <FormModule
                key={document}
                document={document}
                actionBtnLabel="Entrar"
                groupsFields={handleBuildData}
                onCallBack={(value) => {
                  onCallBack(value);
                }}
              />
              <ButtonAtom
                variant="outlined"
                adVariant="linkStyle"
                onClick={() => setStep(2)}
                style={{ color: BASE_COLORS.blue }}
              >
                Recordar contraseña
              </ButtonAtom>
            </GridAtom>
          )}

          {step === 2 && (
            <GridAtom style={{ width: "100%" }} alignItems="center" gap={4}>
              <FormModule
                actionBtnLabel="Validar"
                groupsFields={fieldBuiltDataGetEmail}
                onCallBack={(value: any) => {
                  setEmail(value.email)
                  onCallBack(value);
                }}
              />
              <ButtonAtom
                variant="outlined"
                adVariant="linkStyle"
                onClick={() => setStep(1)}
                style={{ color: BASE_COLORS.blue }}
              >
                Ir al Login
              </ButtonAtom>
            </GridAtom>
          )}
          {step === 3 && (
            <OtpCodeLightBox
              email={email!}
              onCancelBack={() => setStep(2)}
              onCallBack={(value) => {
                onCallBack({ otp: value, email: email! });
              }}
            />
          )}
          {step === 4 && (
            <GridAtom style={{ width: "100%" }} alignItems="center" gap={4}>
              <FormModule
                actionBtnLabel="Validar"
                groupsFields={fieldBuiltDataNewPassw}
                additionalFields={
                  <TextAtom style={{ color: BASE_COLORS.blue }} type="small">
                    <span style={{ color: "#ff0000" }}>***</span> La contraseña debe
                    contener al menos una letra mayúscula, un carácter especial, no
                    llevar números consecutivos, no tener letras consecutivas
                  </TextAtom>
                }
                onCallBack={(value: any) => {
                  onCallBack({...value, email: email! });
                }}
              />
              <ButtonAtom
                variant="outlined"
                adVariant="linkStyle"
                onClick={() => setStep(1)}
                style={{ color: BASE_COLORS.blue }}
              >
                Ir al Login
              </ButtonAtom>
            </GridAtom>
          )}
        </GridAtom>
      </GridAtom>
    </>
  );
};
