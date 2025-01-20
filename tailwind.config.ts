// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default <Config>{
  content: ['./**/*.vue'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#ff7f0a",
          50: "#fff8ec",
          100: "#fff0d3",
          200: "#ffdca5",
          300: "#ffc26d",
          400: "#ff9d32",
          500: "#ff7f0a",
          600: "#ff6600",
          700: "#cc4902",
          800: "#a1390b",
          900: "#82310c",
          950: "#461604",
        },
      },
      borderColor: { DEFAULT: "#DCDCDC" },
      textColor: {
        primary: "#083344", // Primary text color
        secondary: "#9095A0", // Secondary text color
      },
    }
  }
};