import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        perry: {
          teal: { value: "#00A89D" },
          orange: { value: "#FF9810" },
          brown: { value: "#6B4C2E" },
          white: { value: "#FFFFFF" },
          black: { value: "#000000" },
          50: { value: "#E0F7F6" },
          100: { value: "#B3EBE8" },
          200: { value: "#80DED8" },
          300: { value: "#4DD1C9" },
          400: { value: "#26C5BB" },
          500: { value: "#00A89D" }, // Main Teal
          600: { value: "#008F85" },
          700: { value: "#00756D" },
          800: { value: "#005C55" },
          900: { value: "#00423D" },
        },
      },
    },
    semanticTokens: {
      colors: {
        primary: { value: "{colors.perry.teal}" },
        secondary: { value: "{colors.perry.orange}" },
        accent: { value: "{colors.perry.brown}" },
        bg: { value: "{colors.perry.teal}" }, // Main background
        fg: { value: "{colors.perry.white}" }, // Main text
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
