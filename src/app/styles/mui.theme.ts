"use client";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: ".mui-theme-%s",
    cssVarPrefix: "ems",
  },
  // 타이포그래피 토큰
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  // 간격 토큰
  spacing: 4,

  // 모서리, 그림자 토큰
  shape: {
    borderRadius: 4,
  },
  // shadows: [
  //   'none',
  //   '0px 1px 3px rgba(0,0,0,0.2)',
  //   '0px 1px 5px rgba(0,0,0,0.2)',
  //   // ... 나머지는 필요 시 정의 (25개 필요)
  // ],
  // 색상 토큰
  colorSchemes: {
    light: {
      palette: {
        common: {
          black: "#353637ff",
          white: "#ffffff",
        },
        primary: {
          main: "#196fd2ff",
        },
        secondary: {
          main: "#b000f5ff",
        },
        error: {
          main: "#d32f2fff",
        },
        warning: {
          main: "#ed6c02ff",
        },
        info: {
          main: "#0288d1ff",
        },
        success: {
          main: "#2e7d32ff",
        },
        grey: {
          50: "#fafafa",
          100: "#f5f5f5ff",
          200: "#eeeeeeff",
          300: "#e0e0e0ff",
          400: "#bdbdbdff",
          500: "#9e9e9eff",
          600: "#757575ff",
          700: "#616161ff",
          800: "#424242ff",
          900: "#212121ff",
        },
        text: {
          primary: "#171717ff",
          secondary: "#4f4f4fff",
          disabled: "#9e9e9eff",
        },
        background: {
          default: "#ffffff",
          paper: "#f5f5f5ff",
        },
        action: {
          active: "#171717ff",
          hover: "#e0e0e0ff",
          selected: "#d6d6d6ff",
          disabled: "#bdbdbdff",
          disabledBackground: "#f5f5f5ff",
        },
        divider: "#e0e0e0ff",
      },
    },
    dark: {
      palette: {
        common: {
          black: "#1a2348ff",
          white: "#ffffff",
        },
        primary: {
          main: "#19d266ff",
        },
      },
    },
  },
});

// rootLayout에서 사용할 Roboto 폰트 설정
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export { theme, roboto };
