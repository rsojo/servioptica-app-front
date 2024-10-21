// src/components/Home.tsx
import React from "react";
import ContainerAtom from "../atoms/container";
import { BannerHome } from "../organisms/bannerHome";

const Home: React.FC = () => {
  /*
  const messageContext = useContext(MessageContext);

  const handleSendSnackMessage = () => {
    messageContext?.addMessage({
      content: "This is a Snack message!",
      type: "info",
      messageType: "snack",
    });
  };

  const handleSendAlertMessage = () => {
    messageContext?.addMessage({
      content: "This is an Alert message!",
      type: "error",
      messageType: "alert",
    });
  };

  const handleSendPopupMessage = () => {
    messageContext?.addMessage({
      content: "This is a Popup message!",
      type: "success",
      messageType: "popup",
    });
  };

  const handleSendLightboxMessage = () => {
    messageContext?.addMessage({
      content: "This is a Lightbox message!",
      type: "info",
      messageType: "lightbox",
    });
  };

  const handleSendBackdropMessage = () => {
    messageContext?.addMessage({
      content: "Loading...",
      type: "info",
      messageType: "backdrop",
    });
  };

  const handleSendDialogMessage = () => {
    messageContext?.addMessage({
      content: "This is a Dialog message!",
      type: "info",
      messageType: "dialog",
    });
  };
  */

  return (
    <ContainerAtom style={{ width: "100%", padding: 0 }}>
      <BannerHome />
    </ContainerAtom>
  );
};

export default Home;
