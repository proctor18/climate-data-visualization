/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        climate: {
          blue: "#0066cc",
          red: "#cc0000",
          dark: "#1a1a1a",
        },
      },
    },
  },
  plugins: [],
}
