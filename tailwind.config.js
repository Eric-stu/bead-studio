/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bead: {
          bg: '#f8f9fa',
          panel: '#ffffff',
          border: '#e2e8f0',
          accent: '#6366f1',
          'accent-hover': '#4f46e5',
        },
      },
    },
  },
  plugins: [],
}
