import type { Config } from "tailwindcss";
import {
  // layout
  LAYOUT_MIN_WIDTH,
  HEADER_HEIGHT,
  // home
  HOME_MIN_HEIGHT,
} from "@configs/tailwind.constant"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
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
