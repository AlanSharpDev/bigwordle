/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        correct: '#538d4e',
        present: '#c97c2e',
        absent: '#3a3a3c',
        'key-unused': '#818384',
        'key-absent': '#3a3a3c',
      },
      keyframes: {
        'flip-in': {
          '0%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(-90deg)' },
        },
        'flip-out': {
          '50%': { transform: 'rotateX(-90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-20px)' },
          '60%': { transform: 'translateY(-10px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-6px)' },
          '40%': { transform: 'translateX(6px)' },
          '60%': { transform: 'translateX(-6px)' },
          '80%': { transform: 'translateX(6px)' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.12)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'flip-in': 'flip-in 0.25s ease-in forwards',
        'flip-out': 'flip-out 0.25s ease-out forwards',
        bounce: 'bounce 0.8s ease-in-out',
        shake: 'shake 0.4s ease-in-out',
        pop: 'pop 0.1s ease-in-out',
      },
    },
  },
  plugins: [],
}

