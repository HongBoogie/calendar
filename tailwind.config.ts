import type { Config } from 'tailwindcss';

import { HEADER_HEIGHT, HOME_MIN_HEIGHT, LAYOUT_MIN_WIDTH, CALENDAR_MIN_HEIGHT } from './src/configs/tailwind.constant';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        header: HEADER_HEIGHT,
      },
      fontSize: {
        '2xs': '.5rem',
      },
      fontWeight: {
        light: '300',
      },
      boxShadow: {
        modal: '0 0 4px rgba(0, 0, 0, .4), 0 4px 16px rgba(0, 0, 0, .5)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      bg: {
        modal: 'rgba(0, 0, 0, .5)',
      },
      minHeight: {
        home: HOME_MIN_HEIGHT,
        calendar: CALENDAR_MIN_HEIGHT,
      },
      minWidth: {
        layout: LAYOUT_MIN_WIDTH,
      },
      padding: {
        header: HEADER_HEIGHT,
      },
    },
  },
  plugins: [],
};
export default config;
