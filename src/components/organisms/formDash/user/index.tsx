import { BASE_COLORS } from "../../../../style/constants";
import { GridAtom, TextAtom, TitleAtom } from "../../../atoms";
import { FormModule } from "../../../molecules/form";
import FieldBuiltData from "../data/fieldBuiltDataUser.json";
import FieldBuiltDataEdit from "../data/fieldBuiltDataUserEdit.json";
import { PreDataType } from "../../../molecules/form/type";
import { updateDefaultsValues } from "../../formLogin/libs";
import { useMessage } from "../../../../hooks/useMessage";

export const UsersForm = ({
  onCallBack,
  goBack,
  editData,
}: {
  onCallBack: (value: PreDataType) => void;
  goBack?: () => void;
  editData: Array<{
    groupName: string;
    fieldName: string;
    newValue: string;
    isEdit?: boolean
  }> | null;
}) => {
  const { errorSnackMessage } = useMessage();

  return (
    <GridAtom gap={4} alignItems="center" style={{ width: "100%" }}>
      <GridAtom gap={2} style={{ width: "100%" }}>
        <TitleAtom
          type="h2"
          style={{
            color: BASE_COLORS.blue,
            width: "100%",
            fontWeight: 900,
            fontSize: 30,
          }}
        >
          Crear usuario
        </TitleAtom>
        <GridAtom
          style={{
            width: "100%",
            borderBottom: "1px solid",
            borderColor: BASE_COLORS.blue,
          }}
        />
      </GridAtom>
      <GridAtom gap={0} style={{ width: "100%", maxWidth: 447 }}>
        <FormModule
          variant={"form"}
          actionBtnLabel="Guardar"
          actionBackBtnLabel="Cancelar"
          additionalFields={
            <TextAtom style={{ color: BASE_COLORS.blue }} type="small">
              <span style={{ color: "#ff0000" }}>***</span> La contraseña debe
              contener al menos una letra mayúscula, un carácter especial, no
              llevar números consecutivos, no tener letras consecutivas
            </TextAtom>
          }
          groupsFields={
            !editData
              ? FieldBuiltData
              : updateDefaultsValues({
                  data: FieldBuiltDataEdit,
                  updates: editData,
                })
          }
          onGoBackCallBack={goBack}
          onCallBack={(value) => {
            if (value?.password !== value?.password_2) {
              errorSnackMessage("¡Las claves no coinciden!");
            } else {
              onCallBack(value);
            }
          }}
        />
      </GridAtom>
    </GridAtom>
  );
};
