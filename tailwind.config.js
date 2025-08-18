/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
colors: {
        primary: {
          DEFAULT: '#64748B',
          50: '#F8FAFC',
          100: '#F1F5F9',
          500: '#64748B',
          600: '#475569',
          700: '#334155'
        },
        secondary: {
          DEFAULT: '#94A3B8',
          100: '#F1F5F9',
          500: '#94A3B8'
        },
        accent: {
          DEFAULT: '#8B5CF6',
          100: '#F3F4F6',
          500: '#8B5CF6',
          600: '#7C3AED'
        },
        surface: '#FFFFFF',
        background: '#FAFAFA',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#64748B',
        gray: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A'
        }
      },
      fontFamily: {
        'display': ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)'
      },
      animation: {
        'confetti': 'confetti 0.6s ease-out',
        'task-complete': 'taskComplete 0.3s ease-out',
        'progress-ring': 'progressRing 1s ease-out'
      },
      keyframes: {
        confetti: {
          '0%': { transform: 'scale(0.8) rotate(0deg)', opacity: '0' },
          '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(360deg)', opacity: '0' }
        },
        taskComplete: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(0.95)', opacity: '0.7' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        progressRing: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' }
        }
      }
    },
  },
  plugins: [],
}