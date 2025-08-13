/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'google-blue': '#4285F4',
        'google-green': '#34A853',
        'google-red': '#EA4335',
        'google-yellow': '#FBBC04',
      },
      fontFamily: {
        'roboto': ['Roboto', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}