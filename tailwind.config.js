module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/**/*.{html, js}'],
  theme: {
    extend: {
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
        '4xl': '3rem', //48
        '5xl': '3.5rem', //56
        '6xl': '4rem', //64
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
