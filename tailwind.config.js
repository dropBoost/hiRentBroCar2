/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['var(--font-nunito)'],
        barcode128: ['var(--font-libre_Barcode_128)'],
        montserrat: ['var(--font-montserrat)'],
      },
      colors: {
        'brand': {
          500: '#004082',
        },
        'brandDark': {
          500: '#272726',
        },       
      },
    },
  },
  plugins: [],
}