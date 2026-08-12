import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#0c0c0c',
          light: '#141414',
          lighter: '#1a1a1a',
        },
        cream: {
          DEFAULT: '#f5f0e8',
          dim: '#c8c0b0',
        },
        gold: {
          DEFAULT: '#c9a227',
          light: '#e8c84a',
          dark: '#a88220',
        },
        brown: {
          DEFAULT: '#3d2b1f',
          dark: '#2a1d15',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
        'plate-spin': 'plateSpin 12s linear infinite',
        'steam-rise': 'steamRise 3s ease-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        plateSpin: {
          '0%': { transform: 'rotateY(0deg) rotateX(10deg)' },
          '100%': { transform: 'rotateY(360deg) rotateX(10deg)' },
        },
        steamRise: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0' },
          '20%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-50px) scale(2.5)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
