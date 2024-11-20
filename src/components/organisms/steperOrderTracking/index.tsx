import { useEffect, useMemo } from "react";
import { GridAtom, RowAtom } from "../../atoms";
import {
  OrderDelivered,
  OrderDelivery,
  OrderEnlistment,
  OrderProduction,
  OrderReceived,
} from "./step";
import "./style.css";
import { OrderData } from "../../../api/Orders/type";

export const SteperOrderTracking = ({
  currentStep,
  data,
}: {
  currentStep: number;
  data: OrderData[] | null
}) => {
  const step1 = useMemo(() => data?.find((item)=>item.seq_no === '1'), [data]);
  const step2 = useMemo(() => data?.find((item)=>item.seq_no === '2'), [data]);  
  const step3 = useMemo(() => data?.find((item)=>item.seq_no === '3'), [data]);
  const step4 = useMemo(() => data?.find((item)=>item.seq_no === '4'), [data]);
  const step5 = useMemo(() => data?.find((item)=>item.seq_no === '5'), [data]);



  return (
    <GridAtom className="SteperOrderTracking_Box">
      <RowAtom
        className="SteperOrderTracking_Row"
        gap={4}
        alignItems="flex-start"
      >
        <GridAtom className="SteperOrderTracking_Bar">
          <GridAtom
            style={{
              width: `${currentStep * (100 / 5)}%`,
              position: "absolute",
              height: "100%",
              background: "rgb(175 214 247)",
              borderRadius: 30,
            }}
          />
        </GridAtom>
        <OrderReceived data={step1} />
        <OrderProduction data={step2} />
        <OrderEnlistment data={step3} />
        <OrderDelivery data={step4} />
        <OrderDelivered data={step5} />
      </RowAtom>
    </GridAtom>
  );
};
