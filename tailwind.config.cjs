/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mplus: ['"M PLUS Rounded 1c"', 'sans-serif']
      }
    }
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        winter: {
          primary: '#66CC8A',
          secondary: '#377CFB',
          accent: '#EA5234',
          neutral: '#333C4D',
          'base-100': '#FFFFFF',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272'
        }
      }
    ],
    darkTheme: 'winter'
  }
}
