/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1A1F37",
        secondary: "#060B2694",
        iconActive: "#0075FF",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
