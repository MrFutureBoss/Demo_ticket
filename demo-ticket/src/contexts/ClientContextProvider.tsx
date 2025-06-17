"use client";
import React, { createContext, useContext, useState } from "react";

interface ClientContextType {
  isLeftVisible: boolean;
  toggleLeftVisibility: () => void;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export function ClientContextProvider({ children }: { children: React.ReactNode }) {
  const [isLeftVisible, setIsLeftVisible] = useState(true);

  const toggleLeftVisibility = () => {
    setIsLeftVisible((prev) => !prev);
  };

  return (
    <ClientContext.Provider value={{ isLeftVisible, toggleLeftVisibility }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClient() {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error("useClient must be used within a ClientProvider");
  }
  return context;
}
