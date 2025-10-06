/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        dotts: "url('/src/assets/dotts.svg')",
      },
    },
    keyframes: {
      shine: {
        "0%": { "background-position": "100%" },
        "100%": { "background-position": "-100%" },
      },
    },
    animation: {
      shine: "shine 5s linear infinite",
    },
  },
  plugins: [],
};
