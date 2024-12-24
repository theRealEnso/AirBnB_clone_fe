/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-up': { // define a variable called slide up
          '0%': { transform: 'translateY(20px)', opacity: 0 }, // start state
          '100%': { transform: 'translateY(0)', opacity: 1 }, // end state
        },
      },
      animation: {
        'slide-up': 'slide-up 0.5s ease', // referencing the 'slide-up' keyframe
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
