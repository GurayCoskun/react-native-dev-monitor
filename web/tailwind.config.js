/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0f172a',
        'dark-lighter': '#1e293b',
      }
    },
  },
  plugins: [],
}