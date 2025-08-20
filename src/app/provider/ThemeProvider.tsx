'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { theme } from '@/app/ui/styles/mui.theme';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MuiThemeProvider theme={theme} defaultMode="system">
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
