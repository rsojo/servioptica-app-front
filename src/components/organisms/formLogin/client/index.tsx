import { BASE_COLORS } from "../../../../style/constants";
import { GridAtom, SpaceAtom, TextAtom } from "../../../atoms";
import { FormModule } from "../../../molecules/form";
import BkLogin from "../../../../assets/img/bkLogin.webp";
import { updateDefaultValues } from "../libs";

import FieldBuiltData from "../data/fieldBuiltDataNit.json";
import FieldBuiltDataSede from "../data/fieldBuiltDataNitSede.json";

export const LoginClientForm = ({
  setStep,
  setNit,
  setFormData,
  step,
  nit,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setNit: React.Dispatch<React.SetStateAction<string>>;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  step: number;
  nit: string;
}) => {
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
                setFormData(value);
              }}
            />
          )}
        </GridAtom>
      </GridAtom>
    </>
  );
};
