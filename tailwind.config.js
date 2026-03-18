/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  // NOTE: update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#fcdc5f",
        light: "#ffffff",
        dark: "#22252a",
        "accent-rose": "hsl(330, 70%, 85%)",
        "accent-sky": "hsl(200, 60%, 80%)",
        "accent-mint": "hsl(100, 40%, 80%)",
      },
      fontFamily: {
        display: ["Spline Sans", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".neo-shadow": {
          shadowColor: "#000",
          shadowOffset: { width: 3, height: 3 },
          shadowOpacity: 1,
          shadowRadius: 0,
          elevation: 3, // Android
        },
        ".neo-shadow-sm": {
          shadowColor: "#000",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 0,
          elevation: 2,
        },
      });
    }),
  ],
};
