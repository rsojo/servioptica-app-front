import { BASE_COLORS } from "../../../../style/constants";
import { ColumnAtom, GridAtom, TextAtom, TitleAtom } from "../../../atoms";

export const OrderDelivered = ({ actibe }: { actibe: boolean }) => {
  return (
    <ColumnAtom className="StepOrder_Box" alignItems="center" gap={2}>
      <GridAtom
        className="StepOrder"
        style={{
          background: actibe ? BASE_COLORS.blue : "#DEDEDE",
        }}
      >
        <svg width="52.4" height="18.714" viewBox="0 0 52.4 18.714">
          <path
            id="Icon_ionic-md-glasses"
            data-name="Icon ionic-md-glasses"
            d="M54.65,12.375H30.322v.012H26.579v-.012H2.25v5.614H3.537L4.121,20.5C5.993,28.4,8.859,31.089,15.35,31.089S26.579,29.054,26.579,20.5V17.989s.175-1.871,1.871-1.871,1.871,1.871,1.871,1.871v2.55c0,8.538,4.924,10.55,11.346,10.55s9.24-2.924,11.112-10.55l.585-2.55H54.65V12.375Z"
            transform="translate(-2.25 -12.375)"
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
            Pedido entregado
          </TitleAtom>
        </GridAtom>
        <GridAtom style={{ maxWidth: 200 }} gap={1}>
          <TextAtom
            style={{
              color: actibe ? BASE_COLORS.blue : "#707070",
              textAlign: "center",
              width: "100%",
            }}
          >
            01/09/2024
          </TextAtom>
          <TextAtom
            style={{
              color: actibe ? BASE_COLORS.blue : "#707070",
              textAlign: "center",
              width: "100%",
            }}
          >
            5:19 pm
          </TextAtom>
        </GridAtom>
      </GridAtom>
    </ColumnAtom>
  );
};
