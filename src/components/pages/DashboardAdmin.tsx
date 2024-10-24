// src/components/Dashboard.tsx
import React, { useState } from "react";
import {
  ButtonAtom,
  ColumnAtom,
  ContainerAtom,
  RowAtom,
  SpaceAtom,
} from "../atoms";
import imgBtnGoFAQ from "../../assets/img/imgBtnGoFAQ.webp";
import imgBtnGoUserAdmin from "../../assets/img/imgBtnGoUserAdmin.webp";
import { TableFaqAdmin } from "../organisms/tables/dashboardAdmin/faq";
import { TableMainAdmin } from "../organisms/tables/dashboardAdmin/main";
import { TableUserAdmin } from "../organisms/tables/dashboardAdmin/user";
import { useAtom } from "jotai";
import { appStoreAtom } from "../../store/Auth";
import { Navigate } from "react-router-dom";

const DashboardAdmin: React.FC = () => {
  const [view, setView] = useState<"main" | "faq" | "user">("main");
  const [appStore] = useAtom(appStoreAtom);

  if (!appStore.auth?.access_token) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <ContainerAtom
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SpaceAtom v={40} />
      <RowAtom
        gap={10}
        style={{
          minHeight: 400,
          flexFlow: "wrap",
          maxWidth: 1440,
          width: "100%",
        }}
        p={3}
      >
        <ColumnAtom flex={8} style={{ minWidth: 300 }}>
          {view === "main" && <TableMainAdmin />}
          {view === "faq" && <TableFaqAdmin />}
          {view === "user" && <TableUserAdmin />}
        </ColumnAtom>
        <ColumnAtom flex={4} style={{ minWidth: 300 }} gap={2}>
          <ButtonAtom adVariant="linkStyle" onClick={() => setView("faq")}>
            <img
              src={imgBtnGoFAQ}
              alt="Imágen btn FAQ"
              width={651}
              style={{ width: "100%" }}
            />
          </ButtonAtom>

          <ButtonAtom adVariant="linkStyle" onClick={() => setView("user")}>
            <img
              src={imgBtnGoUserAdmin}
              alt="Imágen btn FAQ"
              width={651}
              style={{ width: "100%" }}
            />
          </ButtonAtom>
        </ColumnAtom>
      </RowAtom>
    </ContainerAtom>
  );
};

export default DashboardAdmin;
