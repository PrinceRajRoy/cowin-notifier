module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat']
      }
    },
    maxHeight: {
      '4/5': '80%',
      'screen-7/10': "70vh"
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
