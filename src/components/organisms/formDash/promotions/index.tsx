import { BASE_COLORS } from "../../../../style/constants";
import { GridAtom, TitleAtom } from "../../../atoms";
import { FormModule } from "../../../molecules/form";
import FieldBuiltData from "../data/fieldBuiltDataPromotion.json";
import { PreDataType } from "../../../molecules/form/type";
import { updateDefaultsValues } from "../../formLogin/libs";

export const PromotionsForm = ({
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
  }> | null;
}) => {
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
          Crear promoción
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
          groupsFields={
            !editData
              ? FieldBuiltData
              : updateDefaultsValues({
                  data: FieldBuiltData,
                  updates: editData,
                })
          }
          onGoBackCallBack={goBack}
          onCallBack={(value) => {
            onCallBack(value);
          }}
        />
      </GridAtom>
    </GridAtom>
  );
};
