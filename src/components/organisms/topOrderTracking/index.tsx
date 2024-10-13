import { BASE_COLORS } from "../../../style/constants";
import { ColumnAtom, RowAtom, TextAtom } from "../../atoms";

export const TopOrderTracking = () => {
  return (
    <RowAtom gap={4} style={{ width: "100%" }} alignItems="center">
      <ColumnAtom style={{ flex: "none" }}>
        <svg width="31.5" height="11.25" viewBox="0 0 31.5 11.25">
          <path
            id="Icon_ionic-md-glasses"
            data-name="Icon ionic-md-glasses"
            d="M33.75,12.375H19.125v.007h-2.25v-.007H2.25V15.75h.773l.352,1.512c1.125,4.746,2.848,6.363,6.75,6.363s6.75-1.223,6.75-6.363V15.75S16.98,14.625,18,14.625s1.125,1.125,1.125,1.125v1.533c0,5.133,2.96,6.342,6.82,6.342s5.555-1.758,6.68-6.342l.352-1.533h.773V12.375Z"
            transform="translate(-2.25 -12.375)"
            fill="#024f8f"
          />
        </svg>
      </ColumnAtom>
      <ColumnAtom style={{ flex: "none" }}>
        <TextAtom
          style={{ color: BASE_COLORS.blue, fontSize: 20, fontWeight: 900 }}
        >
          Pedido
        </TextAtom>
      </ColumnAtom>
      <ColumnAtom style={{ flex: "none" }}>
        <TextAtom style={{ color: BASE_COLORS.blue }}>110</TextAtom>
      </ColumnAtom>
      <ColumnAtom style={{ flex: "none" }}>
        <TextAtom style={{ color: BASE_COLORS.blue }}>1013138654</TextAtom>
      </ColumnAtom>
      <ColumnAtom style={{ flex: "none" }}>
        <TextAtom style={{ color: BASE_COLORS.blue }}>Óptica Txt 01.</TextAtom>
      </ColumnAtom>
      <ColumnAtom style={{ flex: "none" }}>
        <TextAtom
          style={{ color: BASE_COLORS.blue, textDecoration: "underline" }}
        >
          En proceso
        </TextAtom>
      </ColumnAtom>
      <ColumnAtom style={{ flex: "none" }}>
        <TextAtom
          style={{ color: BASE_COLORS.blue, textDecoration: "underline" }}
        >
          02/09/2024
        </TextAtom>
      </ColumnAtom>
    </RowAtom>
  );
};
