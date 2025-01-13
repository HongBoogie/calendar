'use client';

import { type PropsWithChildren } from 'react';
import SidebarProvider from './SidebarProvider';
import ThemeProvider from './ThemeProvider';

type Props = PropsWithChildren;

const GlobalProvider = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
};

export default GlobalProvider;
