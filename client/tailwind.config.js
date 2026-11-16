/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8F9FA',
        foreground: '#111111',
        electric: '#C6F906',
        moss: '#768948',
        sky: '#0088FF',
        pastelPink: '#FFB8F6',
        ink: '#111111',
        mutedGray: '#E5E7EB',
      },
      fontFamily: {
        display: ['var(--font-anton)', 'Impact', 'sans-serif'],
        serif: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-plus-jakarta)', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        brutal: '4px 4px 0px #111111',
        'brutal-sm': '2px 2px 0px #111111',
        'brutal-lg': '6px 6px 0px #111111',
        'brutal-xl': '8px 8px 0px #111111',
        'brutal-hover': '2px 2px 0px #111111',
      },
      borderWidth: {
        3: '3px',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'bob': 'bob 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        bob: {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '100%': { transform: 'translateY(-6px) rotate(2deg)' },
        },
      },
    },
  },
  plugins: [],
};
