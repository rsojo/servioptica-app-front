import GridAtom from "../../../atoms/grid";
import { SpaceAtom } from "../../../atoms/space";
import TextAtom from "../../../atoms/text";
import { FormModule } from "../../../molecules/form";
import BkLogin from "../../../../assets/img/bkLogin.webp";
import { BASE_COLORS } from "../../../../style/constants";

import fieldBuiltDataOpt from "../../../organisms/formLogin/data/fieldBuiltDataOpt.json";

export const LoginOptForm = ({
  setStep,
  setFormData
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setFormData: React.Dispatch<React.SetStateAction<any>>
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
            <FormModule
              actionBtnLabel="Entrar"
              groupsFields={fieldBuiltDataOpt}
              onCallBack={(value) => {
                setStep(3);
                setFormData(value)
              }}
            />
        </GridAtom>
      </GridAtom>
    </>
  );
};
