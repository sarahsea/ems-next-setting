'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';
import { WebSocketProvider } from './WebsocketProvider';

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  //       const locale = typeof navigator !== "undefined" ? navigator.language : "en";

  //   const i18n: I18n = useMemo(
  //     () => ({
  //       locale,
  //       t: (k) => k, // plug your i18n library here
  //     }),
  //     [locale]
  //   );

  return (
    <AppRouterCacheProvider>
      {/* <I18nContext.Provider value={i18n}> */}
      <QueryProvider>
        <ThemeProvider>
          <WebSocketProvider>{children}</WebSocketProvider>
        </ThemeProvider>
      </QueryProvider>
      {/* </I18nContext.Provider> */}
    </AppRouterCacheProvider>
  );
}
