import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem", screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#dbe7ff",
          200: "#bcd1ff",
          300: "#8db1ff",
          400: "#5b89ff",
          500: "#3563ff",
          600: "#1f44e6",
          700: "#1a36b8",
          800: "#192f92",
          900: "#192c73",
          950: "#0f1947",
        },
        accent: {
          500: "#ff8a1f",
          600: "#f06d00",
        },
        ink: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#0b1220",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,.06), 0 1px 3px rgba(16,24,40,.1)",
        "card-lg": "0 4px 6px -1px rgba(16,24,40,.1), 0 2px 4px -2px rgba(16,24,40,.1)",
      },
    },
  },
  plugins: [],
};
export default config;
