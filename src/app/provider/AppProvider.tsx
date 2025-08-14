'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import QueryProvider from './QueryProvider';
import ThemeProvider from './ThemeProvider';
import WebSocketProvider from './WebsocketProvider';

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider>
      <QueryProvider>
        <ThemeProvider>
          <WebSocketProvider>{children}</WebSocketProvider>
        </ThemeProvider>
      </QueryProvider>
    </AppRouterCacheProvider>
  );
}
