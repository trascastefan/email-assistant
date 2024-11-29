/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
        },
        secondary: '#64748b',
        accent: '#0ea5e9',
        success: '#059669',
        danger: '#dc2626',
        surface: {
          DEFAULT: '#ffffff',
          secondary: '#f8fafc',
        },
        text: {
          primary: '#1e293b',
          secondary: '#475569',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 4px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
      }
    },
  },
  plugins: [],
};