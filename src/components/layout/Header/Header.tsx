'use client';

import Link from 'next/link';
import HamburgerSvg from '../../svg/HamburgerSvg';
import ThemeController from '../ThemeController';
import useThemeContext from '@/hooks/useThemeContext';
import { useSidebarContext } from '@/providers/SidebarProvider';
import clsx from 'clsx';
import WhiteHamburgerSvg from '@/components/svg/WhiteHamburgerSvg';

const Header = () => {
  const { setIsSidebarOpen, isSidebarOpen } = useSidebarContext();
  const { theme } = useThemeContext();

  return (
    <Link href="/">
      <header
        className={clsx('h-9 flex items-center gap-2 ml-2', {
          'text-slate-300': theme === 'DARK',
        })}
      >
        <p className="flex items-center gap-2 ">
          <button onClick={() => setIsSidebarOpen()} aria-label={isSidebarOpen ? '사이드바 닫기' : '사이드바 열기'}>
            {theme === 'DARK' ? <WhiteHamburgerSvg /> : <HamburgerSvg />}
          </button>
        </p>
        <div className="flex w-full items-center justify-between">
          <p className="">
            Time<strong>Blocks</strong>
          </p>
          <ThemeController />
        </div>
      </header>
    </Link>
  );
};

export default Header;
