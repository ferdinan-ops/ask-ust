/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1080px'
      }
    },
    extend: {
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const utilities = {
        '.bg-search': {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='19' height='19' viewBox='0 0 19 19' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M17.0447 16.2055L14.1472 13.308C15.1962 12.065 15.8335 10.4611 15.8335 8.70837C15.8335 4.77379 12.6431 1.58337 8.7085 1.58337C4.77391 1.58337 1.5835 4.77379 1.5835 8.70837C1.5835 12.643 4.77391 15.8334 8.7085 15.8334C10.462 15.8334 12.0652 15.1969 13.3065 14.1471L16.204 17.0446C16.3204 17.1602 16.4732 17.2188 16.6236 17.2188C16.774 17.2188 16.9284 17.161 17.0432 17.0446C17.2767 16.8127 17.2767 16.4374 17.0447 16.2055ZM2.771 8.70837C2.771 5.43483 5.43495 2.77087 8.7085 2.77087C11.982 2.77087 14.646 5.43483 14.646 8.70837C14.646 11.9819 11.982 14.6459 8.7085 14.6459C5.43495 14.6459 2.771 11.9819 2.771 8.70837Z' fill='%235B7083'/%3E%3C/svg%3E%0A")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '20px',
        }
      }
      addUtilities(utilities);
    })
  ],
};
