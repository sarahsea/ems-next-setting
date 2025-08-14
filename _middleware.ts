import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ko'],
  defaultLocale: 'en',
  localePrefix: 'never',
  // localeDetection: true, // 기본 true, 쿠키 없으면 Accept-Language 헤더로 언어 결정
});
