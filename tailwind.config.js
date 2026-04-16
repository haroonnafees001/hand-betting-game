/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0F1F",
        surface: "#11182D",
        surface2: "#18213B",

        primary: "#22D3EE",   // cyan
        secondary: "#8B5CF6", // purple
        accent: "#A3E635",    // lime

        text: "#F8FAFC",
        muted: "#94A3B8",

        danger: "#F43F5E",
        warning: "#FACC15",

        border: "#24304D",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Orbitron", "sans-serif"],
      },

      fontSize: {
        hero: "3rem",
        title: "2rem",
        section: "1.25rem",
        body: "1rem",
        small: "0.875rem",
      },

      borderRadius: {
        card: "16px",
        btn: "12px",
      },

      boxShadow: {
        card: "0 10px 30px rgba(0,0,0,0.25)",
        glow: "0 0 20px rgba(34,211,238,0.4)",
      },
    },
  },
  plugins: [],
};