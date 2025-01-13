'use client';

import React from 'react';
import SidebarLinks from './SidebarLinks';
import { useSidebarContext } from '@/providers/SidebarProvider';
import useThemeContext from '@/hooks/useThemeContext';
import clsx from 'clsx';

const Sidebar = () => {
  const { isSidebarOpen } = useSidebarContext();
  const { theme } = useThemeContext();

  return (
    <>
      {isSidebarOpen && (
        <div
          className={clsx('fixed border-t left-0 w-40 border-r min-h-home z-20', {
            'border-slate-400 text-slate-300': theme === 'DARK',
          })}
        >
          <SidebarLinks href="/" text="캘린더" />
          <SidebarLinks href="/todos" text="할일" />
        </div>
      )}
    </>
  );
};

export default Sidebar;
