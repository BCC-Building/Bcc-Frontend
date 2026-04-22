export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important: true,
  corePlugins: {
    container: false, // Use Bootstrap's container instead
  },
  theme: {
    extend: {
      spacing: {
        '10': '2.5rem',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '[28px]': '28px',
        '[36px]': '36px',
      },
      colors: {
        brand: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c2d4ff',
          300: '#a3bfff',
          400: '#7aa4ff',
          500: '#5a8eff',
          600: '#2d62d4',
          700: '#1f4cb0',
          800: '#1a3a8a',
          900: '#152661',
        },
        slate: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#0f172a',
        },
        accent: {
          50: '#f0fdf4',
          500: '#10b981',
          600: '#059669',
        },
        cyan: {
          300: '#06b6d4',
          600: '#0891b2',
        },
        amber: {
          500: '#f59e0b',
        }
      },
      boxShadow: {
        glow: '0 32px 90px rgba(45, 98, 212, 0.15)',
        soft: '0 18px 48px rgba(15, 23, 42, 0.12)',
        corporate: '0 12px 24px rgba(15, 23, 42, 0.08)',
      },
      backgroundImage: {
        'gradient-corporate': 'linear-gradient(135deg, #1f2937 0%, #2d62d4 100%)',
        'gradient-light': 'linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%)',
        'career-hero': "linear-gradient(180deg, rgba(5, 27, 75, 0.72), rgba(7, 37, 104, 0.68)), url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80')",
      },
    },
  },
  plugins: [],
};
