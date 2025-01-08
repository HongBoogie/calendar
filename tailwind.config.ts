import type { Config } from "tailwindcss";

import { HEADER_HEIGHT, HOME_MIN_HEIGHT, LAYOUT_MIN_WIDTH } from "./src/configs/tailwind.constant";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",  
  ],
  theme: {
    extend: {
      height: {
        header: HEADER_HEIGHT,
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      minHeight: {
        home: HOME_MIN_HEIGHT,
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
