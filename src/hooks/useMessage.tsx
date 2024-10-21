import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

export const useMessage = () => {
  const messageContext = useContext(MessageContext);

  const errorSnackMessage = (content: string) => {
    messageContext?.addMessage({
      isOpen: true,
      content: content,
      type: "error",
      messageType: "snack",
    });
  };

  const successSnackMessage = (content: string) => {
    messageContext?.addMessage({
      isOpen: true,
      content: content,
      type: "success",
      messageType: "snack",
    });
  };
  return { errorSnackMessage, successSnackMessage };
};
