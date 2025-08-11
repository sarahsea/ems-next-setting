"use client";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  cssVariables: {
    colorSchemeSelector: ".mui-theme-%s",
  }, // var(--mui-palette-primary-main) etc.
  colorSchemes: {
    light: {
      palette: {
        common: {
          black: "#353637ff",
          white: "#ffffff",
        },
        primary: {
          main: "#1976d2",
        },
      },
    },
    dark: {
      palette: {
        common: {
          black: "#1a2348ff",
          white: "#ffffff",
        },
        primary: {
          main: "#1976d2",
        },
      },
    },
  },
});
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export { theme, roboto };
