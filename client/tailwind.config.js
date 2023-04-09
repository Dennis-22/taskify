/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor:{
        skin:{
          "white-base": "var(--color-text-white-base)",
          "white-muted":"var(--color-text-white-muted)",
          "black-base":"var(--color-text-black-base)",
          "black-muted":"var(--color-text-black-muted)",
          "primary":"var(--color-bg-primary)",
          blue:"var(--color-text-blue)",
          red: "var(--color-text-red)",
          yellow: "var(--color-text-yellow)",
          green: "var(--color-text-green)"
        }
      },
      backgroundColor:{
        skin:{
          white:"var(--color-bg-white)",
          "border-color":"var(--color-border)",
          blue:"var(--color-bg-blue)",
          "btn-blue":"var(--color-btn-blue)",
          red: "var(--color-bg-red)",
          yellow: "var(--color-bg-yellow)",
          green: "var(--color-bg-green)"
        }
      }
    },
    plugins: [],
  }
}

