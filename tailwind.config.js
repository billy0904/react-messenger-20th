/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}", ],
  theme: {
    colors: {
      'Purple/3': '#D3B8FF',
      'White': '#FFFFFF',

    },
    extend: {
      width: {
        'width': '375px',
      },
      height: {
        'height': '812px',
        'topBarHeight': '52px', 
      },
    }
  },
  plugins: [],
}


