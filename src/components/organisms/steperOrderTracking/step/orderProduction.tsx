import { BASE_COLORS } from "../../../../style/constants";
import { ColumnAtom, GridAtom, TextAtom, TitleAtom } from "../../../atoms";

export const OrderProduction = ({ actibe }: { actibe: boolean }) => {
  return (
    <ColumnAtom className="StepOrder_Box" alignItems="center" gap={2}>
      <GridAtom
        className="StepOrder"
        style={{
          background: actibe ? BASE_COLORS.blue : "#DEDEDE",
        }}
      >
        <svg width="39" height="39" viewBox="0 0 39 39">
          <path
            id="Icon_awesome-microscope"
            data-name="Icon awesome-microscope"
            d="M12.188,24.375H13.1v1.219a1.218,1.218,0,0,0,1.219,1.219h3.047a1.218,1.218,0,0,0,1.219-1.219V24.375H19.5a2.438,2.438,0,0,0,2.438-2.437V4.875A2.438,2.438,0,0,0,19.5,2.438V1.219A1.218,1.218,0,0,0,18.281,0H13.406a1.218,1.218,0,0,0-1.219,1.219V2.438A2.438,2.438,0,0,0,9.75,4.875V21.938A2.438,2.438,0,0,0,12.188,24.375Zm23.156,9.75h-.1A14.6,14.6,0,0,0,24.375,9.75v4.875a9.75,9.75,0,1,1,0,19.5H3.656A3.656,3.656,0,0,0,0,37.781,1.218,1.218,0,0,0,1.219,39H37.781A1.218,1.218,0,0,0,39,37.781,3.656,3.656,0,0,0,35.344,34.125ZM7.922,31.688H23.766a.609.609,0,0,0,.609-.609V29.859a.609.609,0,0,0-.609-.609H7.922a.609.609,0,0,0-.609.609v1.219A.609.609,0,0,0,7.922,31.688Z"
            fill={actibe ? "#dbe3ff" : "#ffffff"}
          />
        </svg>
      </GridAtom>
      <GridAtom alignItems="center" gap={1}>
        <GridAtom style={{ maxWidth: 210, minHeight: 45 }}>
          <TitleAtom
            type="h3"
            style={{
              color: actibe ? BASE_COLORS.blue : "#DEDEDE",
              textAlign: "center",
              fontWeight: 900,
            }}
          >
            Pedido en proceso productivo
          </TitleAtom>
        </GridAtom>
        <GridAtom style={{ maxWidth: 200 }}>
          <TextAtom
            style={{
              color: actibe ? BASE_COLORS.blue : "#707070",
              textAlign: "center",
              width: "100%",
            }}
          >
            01/09/2024
          </TextAtom>
        </GridAtom>
      </GridAtom>
    </ColumnAtom>
  );
};
