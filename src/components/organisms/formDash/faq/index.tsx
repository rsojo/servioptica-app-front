import { BASE_COLORS } from "../../../../style/constants";
import { GridAtom, TitleAtom } from "../../../atoms";
import { FormModule } from "../../../molecules/form";

import FieldBuiltData from "../data/fieldBuiltDataFaq.json";
import { PreDataType } from "../../../molecules/form/type";

export const FaqForm = ({
  onCallBack,
  isEdit,
}: {
  onCallBack: (value: PreDataType) => void;
  isEdit: boolean;
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
            fontSize: 30
          }}
        >
          Faq - Preguntas Frecuentes
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
          // groupsFields={updateDefaultValues(
          //   updateSelectFieldOptions(FieldBuiltDataSede, "login_sede", sede),
          //   "login",
          //   "document",
          //   nit
          // )}
          groupsFields={FieldBuiltData}
          onCallBack={(value) => {
            // setFormData!(value);
            onCallBack(value);
          }}
        />
      </GridAtom>
    </GridAtom>
  );
};
