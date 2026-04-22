/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4f6f8',
          100: '#e2e8f0',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        },
        dark: {
          bg: '#0f172a',
          card: '#1e293b',
          text: '#f8fafc',
          border: '#334155'
        }
      }
    },
  },
  plugins: [],
}
