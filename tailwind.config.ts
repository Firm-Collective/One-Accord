import type { Config } from 'tailwindcss';
import { customColors } from './utils/colors';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...customColors,
        "1-themes-keyboard-bg": "var(--1-themes-keyboard-bg)",
        "1-themes-keyboard-key-bg": "var(--1-themes-keyboard-key-bg)",
        "1-themes-keyboard-key-border": "var(--1-themes-keyboard-key-border)",
        "1-themes-label-primary": "var(--1-themes-label-primary)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
