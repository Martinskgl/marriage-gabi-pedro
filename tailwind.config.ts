import type { Config } from "tailwindcss";

// Usado só pelo painel (src/app/(painel)/painel.css)
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
