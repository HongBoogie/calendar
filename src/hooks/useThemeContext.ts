'use client';

import { useContext } from 'react';
import { ThemeContext } from '@/providers/ThemeProvider';

const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('컨텍스트가 초기화되지 않았습니다.');
  }

  return context;
};

export default useThemeContext;
