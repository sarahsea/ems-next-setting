"use client";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../../config/muiTheme";
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MuiThemeProvider theme={theme} disableTransitionOnChange={false}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
