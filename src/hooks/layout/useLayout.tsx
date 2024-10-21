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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const currentLink = {
    isHomePage: location.pathname === "/",
    isHomeAdminPage: location.pathname === "/home-admin",
    isLoginPage: location.pathname === "/login",
    isPreLoginPage: location.pathname === "/pre-login",
    isDashboard: location.pathname === "/dashboard",
    isDashboardOpt: location.pathname === "/dashboard-opt",
    isOrderTracking: location.pathname === "/order-tracking",
    isSearchOrderTracking: location.pathname === "/search-order-tracking",
  };

  useEffect(() => {
    console.log(currentLink);
  }, [currentLink]);

  useEffect(() => {
    const lastMessage =
      messageContext?.messages[messageContext.messages.length - 1];

    if (lastMessage?.messageType === "dialog") {
      setDialogContent(lastMessage);
      setDialogOpen(true);
      messageContext?.clearMessages();
    }
  }, [messageContext]);

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
