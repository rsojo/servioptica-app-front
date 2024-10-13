import React from "react";
import { ContainerAtom, GridAtom, SpaceAtom } from "../atoms";
import { SteperOrderTracking } from "../organisms/steperOrderTracking";
import { BottomOrderTracking } from "../organisms/bottomOrderTracking";
import { TopOrderTracking } from "../organisms/topOrderTracking";

const OrderTracking: React.FC = () => {
  return (
    <ContainerAtom
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        maxWidth: 1440,
      }}
    >
      <SpaceAtom v={40} />
      <GridAtom gap={4} style={{ width: "100%" }} alignItems="center">
        <TopOrderTracking />
        <span
          style={{ borderBottom: "1px solid", width: "100%", marginBottom: 40 }}
        />
        <SteperOrderTracking currentStep={4} />
        <span
          style={{ borderBottom: "1px solid", width: "100%", marginTop: 32 }}
        />
        <BottomOrderTracking />
      </GridAtom>
    </ContainerAtom>
  );
};

export default OrderTracking;
