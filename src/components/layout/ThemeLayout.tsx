'use client';

import useThemeContext from '@/hooks/useThemeContext';
import clsx from 'clsx';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const ThemeLayout = ({ children }: Props) => {
  const { theme } = useThemeContext();

  return (
    <div
      className={clsx({
        'bg-white': theme === 'LIGHT',
        'bg-slate-500': theme === 'DARK',
      })}
    >
      {children}
    </div>
  );
};

export default ThemeLayout;
