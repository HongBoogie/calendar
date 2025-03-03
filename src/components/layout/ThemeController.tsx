'use client';

import { APP_THEME } from '@/libs/constants';
import HeaderControlButton from './Header/HeaderControlBtn';
import useThemeContext from '@/hooks/useThemeContext';

const ThemeController = () => {
  const { theme, toggleTheme } = useThemeContext();
  return (
    <HeaderControlButton
      aria-label={`${theme === APP_THEME.DARK ? '밝은 테마로' : '어두운 테마로'} 변경하기`}
      componentType={theme}
      onClick={toggleTheme}
    />
  );
};

export default ThemeController;
