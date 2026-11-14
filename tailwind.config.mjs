/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        pine: {
          DEFAULT: '#1F3B2D',
          dark: '#162A20',
          light: '#2C523F',
          muted: '#E8EFEA',
        },
        stone: {
          DEFAULT: '#F2EEE6',
          light: '#F8F6F1',
          dark: '#E5DFD3',
        },
        graphite: {
          DEFAULT: '#2B2B2B',
          muted: '#575551',
          light: '#76736D',
        },
        terracotta: {
          DEFAULT: '#B5653A',
          dark: '#99522C',
          light: '#C87B52',
          muted: '#F7ECE6',
        },
        border: {
          DEFAULT: '#D9D3C7',
        },
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', ' Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
};
