// src/components/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Footer, Header } from "../organisms";
import { useLayout } from "../../hooks/layout/useLayout";

const Layout: React.FC = () => {
  const {
    renderMessage,
    messageContext,
    dialogOpen,
    handleDialogClose,
    dialogContent,
    currentLink,
  } = useLayout();

  function getPageType(currentLink: any) {
    switch (true) {
      case currentLink.isHomePage:
        return "main";
      case currentLink.isHomeAdminPage:
        return "main-admin";
      case currentLink.isLoginPage:
        return "login";
      case currentLink.isPreLoginPage:
        return "login";
      case currentLink.isDashboard:
        return "dash";
      case currentLink.isDashboardAdmin:
        return "dash-admin";
      case currentLink.isDashboardPromo:
        return "dash-admin";
      case currentLink.isOrderTracking:
        return "dash";
      case currentLink.isSearchOrderTracking:
        return "search";
      default:
        return "main";
    }
  }

  return (
    <div>
      <Header variant={getPageType(currentLink)} />
      <main style={{ position: "relative" }}>
        <div>
          {messageContext?.messages.map((message, index) =>
            renderMessage(message, index)
          )}
        </div>
        <Outlet />
      </main>
      <Footer />
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{dialogContent?.title}</DialogTitle>
        <DialogContent>
          <p>{dialogContent?.content}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Layout;
