/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#A6AEBF",
        secondary: "#C5D3E8",
        success: "#D0E8C5",
        background: "#FFF8DE",
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}