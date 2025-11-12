/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: "#0a0f1f",
        neonBlue: "#00bfff",
        softBlue: "#1e3a8a",
      },
      boxShadow: {
        neon: "0 0 10px #00bfff, 0 0 20px #00bfff",
      },
    },
  },
  plugins: [],
}
