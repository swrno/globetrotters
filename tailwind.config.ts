import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // GitHub Dark Mode inspired colors
        'github-dark': {
          bg: '#0d1117',
          canvas: '#161b22',
          border: '#30363d',
          text: '#f0f6fc',
          'text-muted': '#8b949e',
          accent: '#238636',
          danger: '#da3633',
          warning: '#d29922',
          info: '#58a6ff',
        }
      }
    },
  },
  plugins: [],
}

export default config