import { BASE_COLORS } from "../../../../style/constants";
import { ColumnAtom, GridAtom, TextAtom, TitleAtom } from "../../../atoms";

export const OrderEnlistment = ({ actibe }: { actibe: boolean }) => {
  return (
    <ColumnAtom className="StepOrder_Box" alignItems="center" gap={2}>
      <GridAtom
        className="StepOrder"
        style={{
          background: actibe ? BASE_COLORS.blue : "#DEDEDE",
        }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36">
          <path
            id="Icon_awesome-box"
            data-name="Icon awesome-box"
            d="M35.824,12.98,32.266,2.306A3.366,3.366,0,0,0,29.067,0H19.125V13.5H35.909A3.212,3.212,0,0,0,35.824,12.98ZM16.875,0H6.933a3.366,3.366,0,0,0-3.2,2.306L.176,12.98a3.211,3.211,0,0,0-.084.52H16.875ZM0,15.75V32.625A3.376,3.376,0,0,0,3.375,36h29.25A3.376,3.376,0,0,0,36,32.625V15.75Z"
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
            Pedido en proceso de alistamiento
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
