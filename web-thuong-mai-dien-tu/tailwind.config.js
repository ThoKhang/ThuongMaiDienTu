/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
        "primary": "#005bbf",
        "primary-container": "#1a73e8",
        "surface": "#f9f9f9",
        "on-surface": "#1a1c1c",
        "on-surface-variant": "#414754",
        "surface-container-low": "#f3f3f3",
        "surface-container-lowest": "#ffffff",
        "surface-container-high": "#e8e8e8",
        "outline-variant": "#c1c6d6",
        "secondary": "#7b5800",
        "primary-fixed": "#d8e2ff",
        },
        fontFamily: {
        headline: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Work Sans", "sans-serif"],
        },
    },
  },
  plugins: [],
}