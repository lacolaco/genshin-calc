const { guessProductionMode } = require('@ngneat/tailwind');
const colors = require('tailwindcss/colors');

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
  prefix: '',
  mode: 'jit',
  purge: {
    content: ['./apps/**/*.{html,ts,css,scss,sass,less,styl}', './libs/**/*.{html,ts,css,scss,sass,less,styl}'],
  },
  corePlugins: {
    grid: false,
  },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cryo: {
          100: colors.blue['100'],
          200: colors.blue['200'],
          DEFAULT: colors.blue['300'],
        },
        geo: {
          100: colors.yellow['100'],
          200: colors.yellow['200'],
          DEFAULT: colors.yellow['300'],
        },
        electro: {
          100: colors.purple['100'],
          200: colors.purple['200'],
          DEFAULT: colors.purple['300'],
        },
        pyro: {
          100: colors.red['100'],
          200: colors.red['200'],
          DEFAULT: colors.red['300'],
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
};
