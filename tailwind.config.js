module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/**/*.{html, js}'],
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#15161A',
      gray: {
        50: '#F1F2F2',
        100: '#BDC8DA',
        200: '#98A6C',
        300: '#8490A6',
        400: '#71798C',
        500: '#5C6373',
        700: '#474D59',
        800: '#292C33',
      },
    },
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
        '2xs': '0.75rem', //12
        xs: '0.875rem', //14
        base: '1rem', //16
        medium: '1.125rem', //18
        large: '1.25 rem', //20
        xl: '1.5 rem', //24
        '2xl': '1.75rem', //28
        '3xl': '2rem', //32
        '4xl': ' 2.5rem', //40
        '5xl': '3rem', //48
        '6xl': '3.5rem', //56
        '7xl': '4rem', //64
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
