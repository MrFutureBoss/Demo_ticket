"use client";
import React, { createContext, useContext, useState } from 'react';

interface SplitterContextType {
  isLeftVisible: boolean;
  toggleLeftVisibility: () => void;
}

const SplitterContext = createContext<SplitterContextType | undefined>(undefined);

export function SplitterProvider({ children }: { children: React.ReactNode }) {
  const [isLeftVisible, setIsLeftVisible] = useState(true);

  const toggleLeftVisibility = () => {
    setIsLeftVisible(prev => !prev);
  };

  return (
    <SplitterContext.Provider value={{ isLeftVisible, toggleLeftVisibility }}>
      {children}
    </SplitterContext.Provider>
  );
}

export function useSplitter() {
  const context = useContext(SplitterContext);
  if (context === undefined) {
    throw new Error('useSplitter must be used within a SplitterProvider');
  }
  return context;
} 