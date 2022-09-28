/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mplus: ['"M PLUS Rounded 1c"', 'sans-serif']
      },
      gridTemplateColumns: {
        "comic-cover": "repeat(auto-fill, minmax(12rem, 1fr))",
      },
    }
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'light'
    ],
    darkTheme: 'light'
  }
}
