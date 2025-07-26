import { OrderData } from "../../../api/Orders/type";
import { BASE_COLORS } from "../../../style/constants";
import { uxDateFormat } from "../../../utils";
import { ColumnAtom, GridAtom, RowAtom, TextAtom } from "../../atoms";

export const BottomOrderTracking = ({data}:{data: OrderData | null}) => {
  return (
    <GridAtom gap={4} style={{ width: "100%" }}>
      <RowAtom gap={4} alignItems="center" style={{ width: "100%", minHeight: 35, maxWidth: 1200 }}>
        <ColumnAtom style={{ flex: 1, minWidth: 200 }}>
          <TextAtom style={{ color: BASE_COLORS.blue }}>
            <strong>Fechas estimadas de entrega:</strong> <br/> {data?.fecha_estimada ? uxDateFormat(data?.fecha_estimada.split(' ')[0]) : '---'}
          </TextAtom>
        </ColumnAtom>
        <ColumnAtom style={{ flex: "none" }}>
          <span style={{ borderLeft: "1px solid", height: 36 }} />
        </ColumnAtom>
        <ColumnAtom style={{ flex: 1, minWidth: 300 }}>
          <TextAtom style={{ color: BASE_COLORS.blue }}>
            <strong>Lote:</strong><br/> {data?.lote_num_laboratorio ?? '---'}
          </TextAtom>
        </ColumnAtom>
        <ColumnAtom style={{ flex: "none" }}>
          <span style={{ borderLeft: "1px solid", height: 36 }} />
        </ColumnAtom>
        <ColumnAtom style={{ flex: 1, minWidth: 200 }}>
          <TextAtom style={{ color: BASE_COLORS.blue, width: "100%" }}>
            <strong>Fechas estimadas de entrega con novedad:</strong> <br/> {data?.fecha_recalculo ? uxDateFormat(data?.fecha_recalculo.split(' ')[0]) : '---'}
          </TextAtom>
        </ColumnAtom>
      </RowAtom>
    </GridAtom>
  );
};
