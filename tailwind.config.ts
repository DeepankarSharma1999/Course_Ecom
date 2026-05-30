import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem", screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        brand: {
          50: "#DFF1EF", // Light Mint
          100: "#E8F2F2", // Very Light Blue-Grey
          200: "#bce4e4",
          300: "#8dd4d4",
          400: "#5ec4c4",
          500: "#2dbdbd",
          600: "#1BA8A8", // Teal
          700: "#168C8C", // Dark Teal
          800: "#127373",
          900: "#0e5959",
          950: "#0a3c3c",
        },
        accent: {
          500: "#ff8a1f",
          600: "#f06d00",
        },
        ink: {
          50: "#f9fafb",
          100: "#F3F4F6", // Light Gray
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6B7280",
          600: "#6B7280", // Medium Gray
          700: "#4b5563",
          800: "#3A3A3A", // Dark Gray
          900: "#3A3A3A",
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
