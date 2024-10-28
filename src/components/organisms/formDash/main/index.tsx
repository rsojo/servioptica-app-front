import GridAtom from "../../../atoms/grid";
import { SpaceAtom } from "../../../atoms/space";
import TextAtom from "../../../atoms/text";
import { FormModule } from "../../../molecules/form";
import BkLogin from "../../../../assets/img/bkLogin.webp";
import { BASE_COLORS } from "../../../../style/constants";
import fieldBuiltDataOpt from "../data/fieldBuiltDataFaq.json";
import { PreDataType } from "../../../molecules/form/type";
import fieldBuiltDataNewPassw from "../data/fieldBuiltDataPromotion.json";
import { ButtonAtom } from "../../../atoms";
import { OtpCodeLightBox } from "../otp";

export const LoginForm = ({
  step,
  onCallBack,
  setStep,
}: {
  step: number;
  onCallBack: (value: PreDataType) => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
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
          {step === 1 && (
            <GridAtom alignItems="center">
              <FormModule
                actionBtnLabel="Entrar"
                groupsFields={fieldBuiltDataOpt}
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
            <GridAtom alignItems="center">
              <FormModule
                actionBtnLabel="Validar"
                groupsFields={fieldBuiltDataNewPassw}
                onCallBack={(value) => {
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
              email={""}
              onCancelBack={() => setStep(2)}
              onCallBack={(value) => {
                onCallBack({ opt: value });
              }}
            />
          )}
        </GridAtom>
      </GridAtom>
    </>
  );
};
