// src/components/Layout.tsx
import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Message, MessageContext } from "../../context/MessageContext";
import { Footer, Header } from "../organisms";
import { SnackbarAtom } from "../atoms/Snack";
import { AlertAtom } from "../atoms/Alert";
import { PopupAtom } from "../atoms/Popup";
import { LightboxAtom } from "../atoms/Lightbox";

const Layout: React.FC = () => {
  const messageContext = useContext(MessageContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<Message | null>(null);

  useEffect(() => {
    const lastMessage =
      messageContext?.messages[messageContext.messages.length - 1];

    if (lastMessage?.messageType === "dialog") {
      setDialogContent(lastMessage);
      setDialogOpen(true);
      messageContext?.clearMessages(); // Limpiar mensajes después de abrir el diálogo
    }
  }, [messageContext]); // Ejecutar efecto cuando cambien los mensajes

  // Función para renderizar mensajes según su tipo
  const renderMessage = (message: Message, index: number) => {
    switch (message.messageType) {
      case "snack":
        return <SnackbarAtom key={index + 1} {...message} />;
      case "alert":
        return <AlertAtom key={index + 1} {...message} />;
      case "popup":
        return (
          <PopupAtom
            key={index + 1}
            message={message}
            messageContext={messageContext!}
          />
        );
      case "lightbox":
        return (
          <LightboxAtom
            key={index + 1}
            message={message}
            messageContext={messageContext!}
          />
        );
      case "backdrop":
        return (
          <Backdrop key={index} open={true} style={{ zIndex: 9999 }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        );
      default:
        return null;
    }
  };

  // Manejo del cierre del diálogo
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Header variant="main" />
      <main style={{position: 'relative'}}>
      <span
          style={{
            width: "100%",
            height: 120,
            background: "linear-gradient(180deg, #ffffff, #ffffff00)",
            position: 'absolute',
            top: 0
          }}
        />
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
