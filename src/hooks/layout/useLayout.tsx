import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Message, MessageContext } from "../../context/MessageContext";
import { SnackbarAtom } from "../../components/atoms/Snack";
import { AlertAtom } from "../../components/atoms/Alert";
import { PopupAtom } from "../../components/atoms/Popup";
import { LightboxAtom } from "../../components/atoms/Lightbox";
import { Backdrop, CircularProgress } from "@mui/material";

export const useLayout = () => {
  const location = useLocation();
  const messageContext = useContext(MessageContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<Message | null>(null);

  const currentLink = {
    isHomePage: location.pathname === "/isHomePage",
    isLoginPage: location.pathname === "/login",
    isLoginOptPage: location.pathname === "/login-opt",
    isDashboard: location.pathname.startsWith("/dashboard"),
    isDashboardOpt: location.pathname.startsWith("/dashboard-opt"),
  };

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

  return {
    handleDialogClose,
    renderMessage,
    dialogOpen,
    dialogContent,
    messageContext,
    currentLink,
  };
};
