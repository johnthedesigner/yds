module.exports = {
  purge: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {},
  },
  theme: {
    colors: {
      parchment: {
        0: '#F7F1E1',
        1: '#ECE8E1',
        2: '#D8D2CB',
        3: '#C5BDB4',
        4: '#B1A89E',
        5: '#9E9287',
        6: '#8A7D71',
        7: '#77675A',
        8: '#635244',
        9: '#503D2D',
        10: '#3C2717',
        11: '#291200',
      },
      crimson: {
        0: '#FFF0EE',
        1: '#F1CBCB',
        2: '#E3A5A7',
        3: '#D48084',
        4: '#C65A60',
        5: '#B24D54',
        6: '#9D4049',
        7: '#89333D',
        8: '#752731',
        9: '#611A25',
        10: '#4C0D1A',
        11: '#38000E',
      },
      navy: {
        0: '#EEF3FF',
        1: '#C7D2E5',
        2: '#9FB1CC',
        3: '#7890B2',
        4: '#506F98',
        5: '#456388',
        6: '#395678',
        7: '#2E4A68',
        8: '#223D59',
        9: '#173149',
        10: '#0B2439',
        11: '#001829',
      },
      ink: {
        0: '#F5F5F5',
        1: '#D0D2D3',
        2: '#ABAFB0',
        3: '#878B8E',
        4: '#62686B',
        5: '#3D4549',
        6: '#353D41',
        7: '#2D363A',
        8: '#242E32',
        9: '#1C262A',
        10: '#141F23',
        11: '#0C171B',
      },
    },
    fontFamily: {
      serif: ['Alegreya', 'serif'],
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // hr: {
            //   borderColor: theme('colors.gray.200'),
            //   borderTopWidth: '1px',
            //   marginTop: '2rem',
            //   marginBottom: '2rem',
            // },
            // 'ol > li::before': {
            //   color: theme('colors.gray.900'),
            // },
            // 'ul > li::before': {
            //   backgroundColor: theme('colors.gray.900'),
            // },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
