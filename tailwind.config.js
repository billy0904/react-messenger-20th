/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}", ],
  theme: {
    colors: {
      'Purple/1': '#AB78FF',
      'Purple/3': '#D3B8FF',
      'White': '#FFFFFF',
      'Gray/2': '#666666',
      'Black': '#000000',
    },
    extend: {
      width: {
        'width': '375px',
      },
      height: {
        'height': '812px',
        'topBarHeight': '52px', 
        'headerHeight': '48px', 
        'indicatorHeight': '13px', 
      },
    }
  },
  plugins: [],
}


