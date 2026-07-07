/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0a0b0d',
          900: '#121212',
          850: '#16181c',
          800: '#1a1d22',
          750: '#20242b',
          700: '#272b33',
          600: '#3a4049',
          500: '#525a66',
          400: '#7a8290',
          300: '#a8b0bd',
          200: '#cdd3de',
          100: '#e6e9ef',
        },
        emerald: {
          DEFAULT: '#10b981',
          50: '#ecfdf5',
          100: '#d1fae5',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        cyan: {
          DEFAULT: '#06b6d4',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        'glow-emerald': '0 0 0 1px rgba(16,185,129,0.25), 0 8px 30px -8px rgba(16,185,129,0.35)',
        'glow-cyan': '0 0 0 1px rgba(6,182,212,0.25), 0 8px 30px -8px rgba(6,182,212,0.35)',
        'card': '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 1px 2px rgba(0,0,0,0.4), 0 12px 32px -16px rgba(0,0,0,0.6)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-line': {
          '0%,100%': { opacity: '0.35' },
          '50%': { opacity: '1' },
        },
        'flow': {
          '0%': { strokeDashoffset: '120' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'fade-in': 'fade-in 0.6s ease-out both',
        'pulse-line': 'pulse-line 2.4s ease-in-out infinite',
        'flow': 'flow 2.5s linear infinite',
      },
    },
  },
  plugins: [],
};
