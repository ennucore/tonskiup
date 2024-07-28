const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-roboto-mono)", ...defaultTheme.fontFamily.mono],
        gotham: ["GothamRounded", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "telegram-bg": "var(--tg-theme-bg-color)",
        "telegram-text": "var(--tg-theme-text-color)",
        "telegram-hint": "var(--tg-theme-hint-color)",
        "telegram-link": "var(--tg-theme-link-color)",
        "telegram-button": "var(--tg-theme-button-color)",
        "telegram-button-text": "var(--tg-theme-button-text-color)",
        "telegram-secondary-bg": "var(--tg-theme-secondary-bg-color)",
        "telegram-header-bg": "var(--tg-theme-header-bg-color)",
        "telegram-accent-text": "var(--tg-theme-accent-text-color)",
        "telegram-section-bg": "var(--tg-theme-section-bg-color)",
        "telegram-section-header-text":
          "var(--tg-theme-section-header-text-color)",
        "telegram-section-separator": "var(--tg-theme-section-separator-color)",
        "telegram-subtitle-text": "var(--tg-theme-subtitle-text-color)",
        "telegram-destructive-text": "var(--tg-theme-destructive-text-color)",
      },
    },
  },
  plugins: [],
};
