import { GridAtom, RowAtom } from "../../atoms";
import "./style.css";
import { OrderData } from "../../../api/Orders/type";
import { GeneralStep } from "./step/generalStep";

export const SteperOrderTracking = ({
  currentStep,
  data,
}: {
  currentStep: number;
  data: OrderData[] | null
}) => {


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
              width: currentStep <= 5 ?`${currentStep * (100 / 5)}%` : "100%",
              position: "absolute",
              height: "100%",
              background: "rgb(175 214 247)",
              borderRadius: 30,
            }}
          />
        </GridAtom>
        {data?.map((item, index) => {
          return (
            <GeneralStep data={item} key={index + 1} />
          );
        })}
      </RowAtom>
    </GridAtom>
  );
};
