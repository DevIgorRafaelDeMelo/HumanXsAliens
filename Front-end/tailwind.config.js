/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2563EB", // Azul principal (similar ao blue-600)
          light: "#3B82F6", // Azul claro (similar ao blue-500)
          dark: "#1E40AF", // Azul escuro (similar ao blue-700)
        },
      },
    },
  },

  plugins: [],
};
