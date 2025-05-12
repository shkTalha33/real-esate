import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // colors
      colors: {
        brand: {
          white: "#fff",
          black: "#000",
          light: "#f8fafc",
          dark: "#0f172a",
          primary: "#4f46e5",
          secondary: "#c4c3d0",
          accent: "#06b6d4",
          muted: "#64748b",
          warning: "#f59e0b", // Golden Yellow
          warningdark: "#d97706",
        },
      },
      // box shadow
      boxShadow: {
        light: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        medium: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        dark: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
      },
      // border radius
      borderRadius: {
        light: "0.25rem", // 4px
        medium: "0.5rem", // 8px
        dark: "1rem", // 16px
      },
      // opacity
      opacity: {
        disabled: "0.3",
      },
      // font sizes
      fontSize: {
        tiny: "0.75rem", // 12px
        base: "1rem", // 16px
        big: "1.25rem", // 20px
        giant: "2rem", // 32px
      },
      // media screens
      screens: {
        xs: "400px", // Custom mobile breakpoint (smaller than 'sm')
        sm: "640px", // Tailwind's default 'sm' breakpoint
        md: "768px", // Tailwind's default 'md' breakpoint
        lg: "1024px", // Tailwind's default 'lg' breakpoint
        xl: "1280px", // Tailwind's default 'xl' breakpoint
        "2xl": "1536px", // Tailwind's default '2xl' breakpoint
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

export default config;
