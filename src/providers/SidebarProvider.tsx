import React from 'react';
import { createContext, useContext, useState, type PropsWithChildren } from 'react';

type SidebarContextProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: () => void;
};

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

const SidebarProvider = ({ children }: PropsWithChildren) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const value = {
    isSidebarOpen: isSidebarOpen,
    setIsSidebarOpen: () => setIsSidebarOpen((prev) => !prev),
  };

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

export default SidebarProvider;

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('컨텍스트가 존재하지 않습니다.');
  }
  return context;
};
