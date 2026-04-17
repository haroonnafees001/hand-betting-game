/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        felt: "#0f402f",
        "felt-dark": "#062017",
        "felt-light": "#1c6a50",
        gold: "#e7be5c",
        ivory: "#f3ecda",
        "chip-red": "#bf2332",
        "chip-black": "#1f2428",
        success: "#5dd39e",
        danger: "#e06a71",
        warning: "#e7be5c",
        text: "#f4f1e7",
        muted: "#b3a98f",
        border: "#7c6230",
        surface: "#0d3327",
        surface2: "#113d2f",
      },
      fontFamily: {
        sans: ["Source Sans 3", "sans-serif"],
        display: ["Cinzel", "serif"],
      },
      fontSize: {
        hero: "3.2rem",
        title: "2.2rem",
        section: "1.35rem",
        body: "1rem",
        small: "0.82rem",
      },
      borderRadius: {
        card: "18px",
        btn: "9999px",
      },
      boxShadow: {
        card: "0 14px 40px rgba(0, 0, 0, 0.35)",
        glow: "0 0 28px rgba(231, 190, 92, 0.28)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      backgroundImage: {
        "felt-radial": "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 55%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.04), transparent 40%)",
      },
    },
  },
  plugins: [],
};
