// src/components/Home.tsx
import React from "react";
import ContainerAtom from "../atoms/container";
import { BannerHomeAdmin } from "../organisms/bannerHomeAdmin";
import { useAtom } from "jotai";
import { appStoreAtom } from "../../store/Auth";
import { Navigate } from "react-router-dom";

const HomeAdmin: React.FC = () => {
  const [appStore] = useAtom(appStoreAtom);


  if (!appStore.auth?.access_token) {
    return <Navigate to="/login" replace />;
  }
  return (
    <ContainerAtom style={{ width: "100%", padding: 0 }}>
      <BannerHomeAdmin />
    </ContainerAtom>
  );
};

export default HomeAdmin;
