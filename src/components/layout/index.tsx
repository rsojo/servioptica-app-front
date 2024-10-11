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

  const { isDashboard } = currentLink;

  return (
    <div>
      <Header variant={isDashboard ? "dash" : "main"} />
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
