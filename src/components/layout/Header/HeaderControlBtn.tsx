import MoonSvg from '../../svg/MoonSvg';
import SunSvg from '../../svg/SunSvg';
import clsx from 'clsx';
import { ButtonHTMLAttributes, useState } from 'react';

type HeaderControlButtonType = keyof typeof headerControlButtonType;

const headerControlButtonType = {
  DARK: 'DARK' as const,
  LIGHT: 'LIGHT' as const,
};

const headerControlButtonTextContent = {
  DARK: '밝은 테마' as const,
  LIGHT: '어두운 테마' as const,
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  componentType: HeaderControlButtonType;
};

const HeaderControlButton = ({ componentType, ...rest }: Props) => {
  return (
    <div className={clsx('relative h-10 w-10')}>
      <button
        className={clsx(
          'inline-flex h-full w-full items-center justify-center overflow-hidden rounded-md',
          'text-content-neutral-primary',
          'hover:bg-surface-neutral-strong bg-transparent',
        )}
        {...rest}
      >
        <HeaderControlIcon componentType={componentType} />
      </button>
    </div>
  );
};

const HeaderControlIcon = ({ componentType }: { componentType: HeaderControlButtonType }) => {
  if (componentType === headerControlButtonType.DARK) {
    return <SunSvg />;
  }
  if (componentType === headerControlButtonType.LIGHT) {
    return <MoonSvg />;
  }

  return null;
};

export default HeaderControlButton;
