import { BASE_COLORS } from "../../../../style/constants";
import { GridAtom, SpaceAtom, TextAtom } from "../../../atoms";
import { FormModule } from "../../../molecules/form";
import BkLogin from "../../../../assets/img/bkLogin.webp";
import fieldBuiltDataNewPassw from "../data/fieldBuiltDataNewPassw.json";
import { assignPassword } from "../../../../api/Auth";
import { useMessage } from "../../../../hooks/useMessage";

type FormData = {
  password_1: string;
  password_2: string;
};

export const RecoverPasswordForm = ({
  onCallBack,
  tokenPass,
  nit,
}: {
  onCallBack: (value: FormData) => void;
  tokenPass: string;
  nit: string;
}) => {
  const { errorSnackMessage, successSnackMessage } = useMessage();

  const handleSendPass = (value: FormData) => {
    const { password_1, password_2 } = value;
    if (password_1 === password_2) {
      assignPassword({
        assignToken: tokenPass,
        document: nit,
        password: password_1,
      }).then((response) => {
        if (response.error) {
          errorSnackMessage(response.message);
        }
        if (!response.error) {
          successSnackMessage(String(response.message));
          //navetgate("/login");
          onCallBack(value);
        }
      });
    }
  };
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
            Recuperar contraseña
          </TextAtom>
          <SpaceAtom v={8} />
          <FormModule
            actionBtnLabel="Validar"
            groupsFields={fieldBuiltDataNewPassw}
            onCallBack={(value) => {
              handleSendPass(value as FormData);
            }}
          />
        </GridAtom>
      </GridAtom>
    </>
  );
};
