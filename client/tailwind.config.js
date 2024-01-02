/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 2s linear infinite ',
        'bounce-slow': 'bounce 2s ease-in infinite  ',
      },
      colors:{
        "background":"#090019",
        "text":"#fccae5",
        "button":" #9947c2",
        "highlight":" #6d3dcc",
        "progress":"#1e0439",
        "padding":"rgb(255,255,255,0.05)",
        "player":"#2e1c3c"
      },
      fontFamily: {
        // logoFont: ['"Allerta Stencil"','"IBM Plex Serif"', '"sans"','"sans-serif"']
      }
    },
  },
  plugins: [],
}