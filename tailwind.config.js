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
          DEFAULT: '#1E40AF',
          50: '#EFF6FF',
          100: '#DBEAFE',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8'
        },
        secondary: {
          DEFAULT: '#60A5FA',
          100: '#F0F9FF',
          500: '#60A5FA'
        },
        accent: {
          DEFAULT: '#06B6D4',
          100: '#CFFAFE',
          500: '#06B6D4',
          600: '#0891B2'
        },
        surface: '#FFFFFF',
        background: '#F8F9FB',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827'
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