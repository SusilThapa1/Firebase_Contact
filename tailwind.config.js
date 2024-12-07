/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        Gray: "#5A5959",
        Red: "#D01C28",
        Yellow: "#FFEAAE",
        "Dark-yellow": "#FCCA3F",
        Purple: "#5F00D9",
        Orange: "#F6B20C",
      },
    },
  },
  plugins: [],
};
