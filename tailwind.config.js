const colors = require('tailwindcss/colors');

module.exports = {
  prefix: '',
  purge: {
    content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}'],
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
