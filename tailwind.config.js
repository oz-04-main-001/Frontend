module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/**/*.{html,js}'],
  theme: {
    extend: {
      colors: { // 'color'에서 'colors'로 수정
        white: '#FFFFFF',
        black: '#15161A',
        basic: {
          50: '#F1F2F2',
          100: '#BDC8DA',
          200: '#98A6CC', // 유효한 HEX 코드로 수정
          300: '#8490A6',
          400: '#71798C',
          500: '#5C6373',
          700: '#474D59',
          800: '#292C33',
        },
        state: {
          err: '#FF8A80',
          warn: '#FFD275',
          safe: '#A5C18F',
        },
        primary: { // primary 색상 추가
          pailBlue300: '#a0c4ff', // 원하는 HEX 코드로 설정
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
        '2xs': '0.75rem', //12px
        xs: '0.875rem',    //14px
        base: '1rem',      //16px
        medium: '1.125rem',//18px
        large: '1.25rem',  //20px (공백 제거)
        xl: '1.5rem',      //24px (공백 제거)
        '2xl': '1.75rem',  //28px
        '3xl': '2rem',     //32px
        '4xl': '2.5rem',   //40px (공백 제거)
        '5xl': '3rem',     //48px
        '6xl': '3.5rem',   //56px
        '7xl': '4rem',     //64px
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
