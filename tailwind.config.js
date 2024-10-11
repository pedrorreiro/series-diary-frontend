import aspectRatio from '@tailwindcss/aspect-ratio'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import rippleui from 'rippleui'
import plugin from 'tailwindcss/plugin'
import { LARGE_WIDTH } from './src/helpers/constraints'

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
  darkMode: 'selector',
  rippleui: {
    themes: [
      {
        themeName: 'light',
        colorScheme: 'light',
        colors: {
          primary: '#1f004d'
        }
      },
      {
        themeName: 'dark',
        colorScheme: 'dark',
        colors: {
          primary: '#1f004d'
        }
      }
    ]
  },
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: `${LARGE_WIDTH}px`
    },
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: ({ opacityValue = 1 }) => `rgba(var(--secondary), ${opacityValue})`,
        background: 'var(--background)',
        'background-2': ({ opacityValue = 1 }) => `rgba(var(--background-2), ${opacityValue})`
      }
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif']
    }
  },
  plugins: [typography, forms, aspectRatio, backfaceVisibility, rippleui]
}
