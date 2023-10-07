/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        blackOlive: '#3b413c',
        cornflowerBlue: '#7996d0',
        lightCyan: '#daf0ee',
        middleBlueGreen: '#94d1be',
        gradientBlue: '#81c6ed',
        gradientGreen: '#3461d2',
        lightgrey: "#EEF1F4",
        whitish: '#F7F7F7',
        dirtyGreen: '#5F8D75',
        greyblue: "#4F718A",
        orange: '#BB654A',
        lightorange: '#FF7F3E',
        greyBlue: "#4F718A"
      },
      fontFamily: {
        sans: ['sans-serif', 'Pacifico'],
        nunito: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

