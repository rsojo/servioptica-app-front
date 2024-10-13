import { useMemo } from "react";
import { GridAtom, RowAtom } from "../../atoms";
import {
  OrderDelivered,
  OrderDelivery,
  OrderEnlistment,
  OrderProduction,
  OrderReceived,
} from "./step";
import "./style.css";

export const SteperOrderTracking = ({
  currentStep,
}: {
  currentStep: number;
}) => {
  const step = useMemo(() => currentStep, [currentStep]);

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
              width: `${step * (100 / 5)}%`,
              position: "absolute",
              height: "100%",
              background: "rgb(175 214 247)",
              borderRadius: 30,
            }}
          />
        </GridAtom>
        <OrderReceived actibe={step >= 1} />
        <OrderProduction actibe={step >= 2} />
        <OrderEnlistment actibe={step >= 3} />
        <OrderDelivery actibe={step >= 4} />
        <OrderDelivered actibe={step >= 5} />
      </RowAtom>
    </GridAtom>
  );
};
