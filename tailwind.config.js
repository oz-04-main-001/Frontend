module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/**/*.{html, js}'],
  theme: {
    extend: {
      colors: {
        state: {
          err: '#FF8A80',
          warn: '#FFD275',
          safe: '#A5C18F',
        },
      },
      fontFamily: {
        sans: [
          'Spoqa Han Sans Neo',
          'sans-serif',
          'ui-sans-serif',
          'system-ui',
        ],
      },
      fontWeight: {
        thin: '100',
        light: '300',
        regular: '400',
        medium: '500',
        bold: '700',
      },
      fontSize: {
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};