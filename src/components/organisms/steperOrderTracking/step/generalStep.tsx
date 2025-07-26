import { useEffect } from "react";
import { OrderData } from "../../../../api/Orders/type";
import { BASE_COLORS } from "../../../../style/constants";
import { ColumnAtom, GridAtom, TextAtom, TitleAtom } from "../../../atoms";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { uxDateFormat } from "../../../../utils";

export const GeneralStep = ({ data }: { data: OrderData }) => {
  const active = data.estado.length > 0;
  useEffect(() => {console.log('[data]', data)}, [data]);
  return (
    <ColumnAtom className="StepOrder_Box" alignItems="center" gap={2}>
      <GridAtom
        className="StepOrder"
        style={{
          background: active ? BASE_COLORS.blue : "#DEDEDE",
          color: active ? "#fff" : BASE_COLORS.gray,
        }}
      >
        <CheckRoundedIcon sx={{width: 48, height: 48}} />
      </GridAtom>
      <GridAtom alignItems="center" gap={1}>
        <GridAtom style={{ maxWidth: 210, minHeight: 45 }}>
          <TitleAtom
            type="h4"
            style={{
              color: active ? BASE_COLORS.blue : "#DEDEDE",
              textAlign: "center",
              fontWeight: 900,
            }}
          >
            {data?.estado ?? '---'}
          </TitleAtom>
        </GridAtom>
        <GridAtom style={{ maxWidth: 200 }} gap={1}>
          <TextAtom
            style={{
              color: active ? BASE_COLORS.blue : "#707070",
              textAlign: "center",
              width: "100%",
            }}
          >
            {uxDateFormat(data?.fecha_estado.split(" ")[0]) ?? '---'}
          </TextAtom>
        </GridAtom>
      </GridAtom>
    </ColumnAtom>
  );
};
