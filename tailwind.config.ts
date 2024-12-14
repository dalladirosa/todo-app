import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        black: 'var(--black)',
        'secondary-black': 'var(--secondary-black)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        brown: 'var(--brown)',
        green: 'var(--green)',
        'light-green': 'var(--light-green)',
        'dark-brown': 'var(--dark-brown)',
        gray: 'var(--gray)',
      },
    },
  },
  plugins: [],
} satisfies Config;
