import type { Config } from 'tailwindcss';
import { customColors } from './utils/colors';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: customColors,
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-poppins)'],
      },
      animation: {
        blob: 'blob 40s cubic-bezier(0.25, 0.1, 0.25, 1) infinite',
      },
      keyframes: {
        blob: {
          '0%, 100%': {
            transform: 'translate(0, 0) rotate(0deg)',
          },
          '20%': {
            transform: 'translate(40vw, 20vh) rotate(90deg)',
          },
          '40%': {
            transform: 'translate(30vw, 50vh) rotate(180deg)',
          },
          '60%': {
            transform: 'translate(50vw, 40vh) rotate(270deg)',
          },
          '80%': {
            transform: 'translate(20vw, 30vh) rotate(360deg)',
          },
          '90%': {
            transform: 'translate(60vw, 60vh) rotate(450deg)',
          },
          '100%': {
            transform: 'translate(0, 0) rotate(540deg)',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
