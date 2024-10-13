// src/components/Home.tsx
import React from "react";
import ContainerAtom from "../atoms/container";
import { BannerHomeAdmin } from "../organisms/bannerHomeAdmin";

const HomeAdmin: React.FC = () => {

  return (
    <ContainerAtom style={{ width: "100%", padding: 0 }}>
      <BannerHomeAdmin />
    </ContainerAtom>
  );
};

export default HomeAdmin;
