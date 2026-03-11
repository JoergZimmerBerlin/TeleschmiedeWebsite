/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'lime-accent': '#D4FF00',
        'dark': '#1A1A1A',
        'gray-text': '#333333',
        'gray-muted': '#4D4D4D',
        'gray': {
          400: '#737373', // Darker gray for meta-text
          500: '#525252',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest': '0.15em',
      }
    },
  },
  plugins: [],
}
