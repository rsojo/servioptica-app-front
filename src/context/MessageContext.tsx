// src/context/MessageContext.tsx
import React, { createContext, useState, ReactNode, FC, useMemo } from "react";

export interface Message {
  isOpen: boolean
  title?: string;
  content: string;
  type: "info" | "success" | "error";
  messageType: "alert" | "popup" | "lightbox" | "snack" | "backdrop" | "dialog"; // Agregar nuevos tipos
}

export interface MessageContextType {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
}

export const MessageContext = createContext<MessageContextType | undefined>(
  undefined
);

export const MessageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  // Utilizamos useMemo para evitar la recreación del objeto de contexto en cada render
  const value = useMemo(
    () => ({ messages, addMessage, clearMessages }),
    [messages] // Solo cambiará si 'messages' cambia
  );

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  );
};
