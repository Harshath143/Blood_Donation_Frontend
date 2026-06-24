/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#C0392B',   // Deep blood red
          warm: '#E74C3C',      // Hover states, badges
          charcoal: '#1A1A2E',  // Headings, nav
          bg: '#F9F4F0',        // Warm off-white
          grey: '#6C757D',      // Body text, labels
          amber: '#F39C12',     // Urgent/warning notices
          green: '#27AE60',     // Success state
          darkRed: '#8B0000',   // Emergency background
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'card': '8px',
        'input': '4px',
        'pill': '50px',
      },
      boxShadow: {
        'elevation': '0 4px 24px rgba(0,0,0,0.08)',
      },
      animation: {
        'heartbeat': 'heartbeat 1.2s infinite ease-in-out',
        'pulse-slow': 'pulse-slow 3s infinite ease-in-out',
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '20%': { transform: 'scale(1.05)' },
          '40%': { transform: 'scale(1)' },
          '60%': { transform: 'scale(1.08)' },
          '80%': { transform: 'scale(1)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.08)' },
        }
      }
    },
  },
  plugins: [],
}
