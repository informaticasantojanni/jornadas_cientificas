/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'Blue': '#005996',
      'LightBlue': '#008abc',
      'Green': '#00797E',
      'LightGreen': '#33BBC1',
      'Violet': '#584ba0',
      'LightViolet': '#7b4ba0',
      'Black': '#000',
      'DarkGrey': '#EEE',
      'White': '#FFF',
      'White-20': 'rgba(255, 255, 255, 0.2)',
      'Red': '#de0a26',
      'PauGreenDark': '#00797E',
      'PauGreenLight': '#33BBC1',
      'PauGreenUltraLight': '#E6F7F7',
      'PauBaseComponents_bkp': '#EAEAEA',
      'PauBaseComponents': '#FFF',
      'PauBackground': '#d2d2d2',
      'PauBackground_bkp': '#858585',
      'TealGreen_1': "#6DA3A8",
      'TealGreen_2': "#82B3B7",
      'TealGreen_3': "#97C3C6",
      'TealGreen_4': "#A3CDD2",
      'CardGrayLight':'#EAEAEA',
      'CardGrayDark':'#4F4F4F'

    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
    fontWeight: {
      thin: '300',
      regular: '400',
      medium: '500',
      semiBold: '600',
      bold: '700',
      black: '900',
    },
    extend: {
      screens: {
        'mobile': '360px',
        'tablet': '768px',
        'laptop1': '1024px',
        'laptop2': '1366px',
        'desktop': '1440px',
      },
      boxShadow: {
        'lightShadowGrey': '0 4px 6px -1px rgba(128, 128, 128, 0.5), 0 2px 4px -1px rgba(128, 128, 128, 0.25)',
        'lightShadowGreen': '0 4px 6px -1px rgba(176, 229, 231, 0.5), 0 2px 4px -1px rgba(176, 229, 231, 0.25)',
        'darkShadowGreen': '0 4px 6px -1px rgba(0, 155, 162, 0.5), 0 2px 4px -1px rgba(0, 155, 162, 0.25)',
      },
      backgroundImage: {
        // 'hero-pattern': "url('/img/hero-pattern.svg')"
      },
    },
  },
  plugins: [],
};

