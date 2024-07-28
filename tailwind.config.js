/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(135deg, #153677, #4e085f)',
      },
      boxShadow: {
        'custom': 'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        'img': {
          display: 'inline',
        },
      })
    },
    function ({ addBase }) {
      addBase({
        '*, ::before, ::after': {
          boxSizing: 'content-box',
        },
      })
    },
  ],
}

