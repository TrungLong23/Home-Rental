
module.exports = {
  content: [
    "./src/**/*.{js, jsx, ts, tsx}",
    "./public/index.html"
],
  theme: {
    extend: {
      width: {
        '1100' : '1100px'
      },
      backgroundColor: {
        primary: "#F5F5F5",
        secondary: "#1266dd",
        secondary2: "#f73859",
        'overlay-30': 'rgb(0,0,0,0.3)',
        'overlay-70': 'rgb(0,0,0,0.7)',
      },
      maxWidth: {
        '600': '600px',
        '1100': '1100px'
      },
      cursor: {
        pointer: 'pointer'
      },
      flex: {
        '3': '3 3 0%' ,
        '2': '2 2 0%' 
      } 

    },
  },
  plugins: [],
}