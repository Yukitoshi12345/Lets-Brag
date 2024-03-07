/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.js', './**/*.handlebars'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fit, minmax(36em, 1fr))',
      },
      fontFamily: {
        heading: ['Playfair Display'],
        content: ['Barlow'],
      },
      height: {
        110: '34rem',
      },
      animation: {
        chat1: 'appear 14s linear infinite',
        chat2: 'appear 14s linear infinite 2s',
        chat3: 'appear 14s linear infinite 4s',
        chat4: 'appear 14s linear infinite 6s',
        chat5: 'appear 14s linear infinite 8s',
        chat6: 'appear 14s linear infinite 10s',
        chat7: 'appear 14s linear infinite 12s',
      },
      keyframes: {
        appear: {
          '0%': { transform: 'rotate(0deg)', 'z-index': 10 },
          '28%': { transform: 'rotate(0deg)', 'z-index': -10 },
          '100%': { transform: 'rotate(0deg)', 'z-index': -10 },
        },
      },
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
 
};
