/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#083156',
        secondary:'#6c757d',
      },
    },
    screens: {
      'xs': '100px',

      'csm': '400px',

      'sm': '599px',
      // => @media (min-width: 576px) { ... }
      
      'bdsm':'700px',

      'md': '960px',
      // => @media (min-width: 960px) { ... }

      'lg': '1440px',
      // => @media (min-width: 1440px) { ... }

      'xl': '1536px',
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [],
}

