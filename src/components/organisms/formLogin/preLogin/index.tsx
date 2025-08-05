import { BASE_COLORS } from "../../../../style/constants";
import {
  GridAtom,
  OptionsSelectAtomIt,
  SpaceAtom,
  TextAtom,
} from "../../../atoms";
import { FormModule } from "../../../molecules/form";
import BkLogin from "../../../../assets/img/bkLogin.webp";
import FieldBuiltData from "../data/fieldBuiltDataNit.json";
import fieldBuiltDataNewPassw from "../data/fieldBuiltDataNewPassw.json";
import { PreDataType } from "../../../molecules/form/type";

export const PreLoginForm = ({
  setNit,
  onCallBack,
  step,
  sede,
  isLoading
}: {
  setNit: React.Dispatch<React.SetStateAction<string>>;
  setFormData?: React.Dispatch<React.SetStateAction<any>>;
  onCallBack: (value: PreDataType) => void;
  step: number;
  nit: string;
  sede: OptionsSelectAtomIt[] | null;
  isLoading: boolean;
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
            <FormModule
              actionBtnLabel="Validar"
              groupsFields={FieldBuiltData}
              loading={isLoading}
              onCallBack={(value) => {
                setNit(String((value as any).login_nit));
                onCallBack(value);
              }}
            />
          )}
          {/*"Selección de Sede"*/}
          {step === 2 && sede?.length! > 0 && (
            <FormModule
              actionBtnLabel="Seleccionar sede"
              loading={isLoading}
              groupsFields={[
                {
                  id: 1,
                  groupName: "login",
                  fields: [
                    {
                      id: 1,
                      label: "",
                      name: "login_sede",
                      type: "select",
                      columnSize: 12,
                      important: true,
                      options: sede,
                      placeholder: "Sede",
                      textError: "Seleccione una sede",
                      minlength: 1,
                    },
                  ],
                },
              ]}
              onCallBack={(value) => {
                // setFormData!(value);
                onCallBack(value);
              }}
            />
          )}
          {step === 4 && (
            <FormModule
              actionBtnLabel="Validar"
              loading={isLoading}
              groupsFields={fieldBuiltDataNewPassw}
              onCallBack={(value) => {
                // setFormData!(value);
                onCallBack(value);
              }}
            />
          )}
        </GridAtom>
      </GridAtom>
    </>
  );
};
