// src/components/Dashboard.tsx
import React, { useState } from "react";
import {
  ButtonAtom,
  ColumnAtom,
  ContainerAtom,
  RowAtom,
  SpaceAtom,
} from "../atoms";
import { TableFaqAdmin } from "../organisms/tables/dashboardAdmin/faq";
import { TableMainAdmin } from "../organisms/tables/dashboardAdmin/main";
import { TableUserAdmin } from "../organisms/tables/dashboardAdmin/user";
import { useAtom } from "jotai";
import { appStoreAtom } from "../../store/Auth";
import { Navigate } from "react-router-dom";
import { TablePromotions } from "../organisms/tables/dashboardAdmin/promotions";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import PersonIcon from '@mui/icons-material/Person';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

type Views = "main" | "faq" | "user" | "promotions";
const DashboardAdmin: React.FC = () => {
  const menu: Array<{ label: string; action: Views; icon: JSX.Element }> = [
    { label: "Administración de Pedidos", action: "main", icon: <Inventory2RoundedIcon /> },
    { label: "Editar Preguntas Frecuentes", action: "faq", icon: <InsertCommentIcon /> },
    { label: "Administración de Usuarios", action: "user", icon: <PersonIcon /> },
    { label: "Editar Promociones", action: "promotions", icon: <BookmarksIcon /> },
  ];
  const [view, setView] = useState<Views>("main");
  const [appStore] = useAtom(appStoreAtom);

  if (!appStore.auth?.access_token) {
    return <Navigate to="/login" replace />;
  }

  if (!appStore.auth.admin) {
    return <Navigate to="/dashboard" replace />;
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
          {view === "promotions" && <TablePromotions />}
        </ColumnAtom>
        <ColumnAtom flex={4} style={{ minWidth: 300 }} gap={2}>
          {menu.map((item, index) => (
            <ButtonAtom
            key={index + 1}
              startIcon={item.icon}
              variant={item.action === view ? "contained" : "outlined"}
              onClick={() => setView(item.action)}
              style={{
                width: "100%",
                fontWeight: 900,
                fontSize: 18,
                textAlign: "left",
                justifyContent: "flex-start",
              }}
              size="small"
            >
              {item.label}
            </ButtonAtom>
          ))}
        </ColumnAtom>
      </RowAtom>
    </ContainerAtom>
  );
};

export default DashboardAdmin;
