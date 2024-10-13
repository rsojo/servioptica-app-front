import { BASE_COLORS } from "../../../style/constants";
import { ColumnAtom, GridAtom, RowAtom, TextAtom } from "../../atoms";

export const BottomOrderTracking = () => {
  return (
    <GridAtom gap={4} style={{ width: "100%" }}>
      <RowAtom gap={4} alignItems="center" style={{ width: "100%", minHeight: 35, maxWidth: 1000 }}>
        <ColumnAtom style={{ flex: 3, minWidth: 200 }}>
          <TextAtom style={{ color: BASE_COLORS.blue }}>
            <strong>Fechas estimadas de entrega:</strong> 06/10/2024
          </TextAtom>
        </ColumnAtom>
        <ColumnAtom style={{ flex: "none" }}>
          <span style={{ borderLeft: "1px solid", height: 36 }} />
        </ColumnAtom>
        <ColumnAtom style={{ flex: 1, minWidth: 150 }}>
          <TextAtom style={{ color: BASE_COLORS.blue }}>
            <strong>Lote:</strong> 1202-2335789
          </TextAtom>
        </ColumnAtom>
        <ColumnAtom style={{ flex: "none" }}>
          <span style={{ borderLeft: "1px solid", height: 36 }} />
        </ColumnAtom>
        <ColumnAtom style={{ flex: 4, minWidth: 200 }}>
          <TextAtom style={{ color: BASE_COLORS.blue, width: "100%" }}>
            <strong>Fechas estimadas de entrega con novedad:</strong> 08/10/2024
          </TextAtom>
        </ColumnAtom>
      </RowAtom>
    </GridAtom>
  );
};
