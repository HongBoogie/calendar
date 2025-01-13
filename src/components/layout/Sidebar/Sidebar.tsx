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
          className={clsx('md:fixed border-t flex md:flex-col', 'md:w-40 md:border-r md:min-h-home z-20', {
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
