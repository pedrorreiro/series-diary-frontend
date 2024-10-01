import aspectRatio from '@tailwindcss/aspect-ratio'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import rippleui from 'rippleui'
import plugin from 'tailwindcss/plugin'

const backfaceVisibility = plugin(function ({ addUtilities }) {
  addUtilities({
    '.backface-visible': {
      'backface-visibility': 'visible'
    },
    '.backface-hidden': {
      'backface-visibility': 'hidden'
    }
  })
})

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  rippleui: {
    themes: [
      {
        themeName: 'dark',
        colorScheme: 'dark',
        colors: {
          primary: '#3C05A3',
          secondary: '#DDDEFF',
          backgroundPrimary: '#19191B',
          primaryText: '#DDDEFF'
        }
      },
      {
        themeName: 'light',
        colorScheme: 'light',
        colors: {
          primary: '#3C05A3',
          secondary: '#DDDEFF',
          backgroundPrimary: '#f5f5f5',
          'primary-text': '#000000'
        }
      }
    ]
  },
  theme: {
    extend: {
      colors: {
        primary: '#3C05A3',
        'primary-background': '#0F0E22',
        'primary-text': '#DDDEFF',
        secondary: 'green'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      }
    }
  },
  plugins: [typography, forms, aspectRatio, backfaceVisibility, rippleui]
}
