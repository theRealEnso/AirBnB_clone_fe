/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.5s ease',
      },
      colors: {
        primary: '#F5385D'
      },
      zIndex: {
        '1000': '1000',
      },
    },
  },
  plugins: [],
}

// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         'slide-up': {
//           '0%': { transform: 'translateY(20px)', opacity: 0 },
//           '100%': { transform: 'translateY(0)', opacity: 1 },
//         },
//       },
//       animation: {
//         'slide-up': 'slide-up 0.5s ease',
//       },
//     },
//   },
// };
