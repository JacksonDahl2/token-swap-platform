/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Base color palette from #C6ECAE
        mint: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        base: {
          50: '#f8fdf8',
          100: '#f0fdf0',
          200: '#ddf4dd',
          300: '#c6ecae', 
          400: '#a8d88a',
          500: '#8bc46a',
          600: '#6ba84a',
          700: '#528c3a',
          800: '#42702e',
          900: '#365a26',
        },
        primary: '#c6ecae',
        'primary-foreground': '#1a1a1a',
        secondary: '#f0fdf0',
        'secondary-foreground': '#365a26',
        accent: '#8bc46a',
        'accent-foreground': '#ffffff',
        background: '#ffffff',
        foreground: '#1a1a1a',
        card: '#ffffff',
        'card-foreground': '#1a1a1a',
        border: '#e5e7eb',
        input: '#f3f4f6',
      },
      fontFamily: {
        sans: ['var(--font-roboto)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
    },
  },
  plugins: [],
}