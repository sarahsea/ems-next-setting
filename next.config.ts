import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

// i18n 설정
const withNextIntl = createNextIntlPlugin(
  './src/shared/i18n/setting/requests.ts',
);

const nextConfig: NextConfig = {
  // reactStrictMode: true, // 빌드 시 StrictMode 적용
  // swcMinify: true, // SWC로 코드 압축
  // poweredByHeader: false, // X-Powered-By 헤더 제거
  // output: 'standalone', // 독립 실행형 빌드
  // // 이미지 공통
  // images: {
  //   formats: ['image/avif', 'image/webp'],
  //   deviceSizes: [640, 768, 1024, 1280, 1600], // 팀 표준 브레이크포인트
  //   imageSizes: [16, 24, 32, 48, 64, 96, 128], // 아이콘/아바타 등
  //   // (외부 이미지 쓰면 remotePatterns 권장)
  //   remotePatterns: [
  //     // TODO: 필요한 CDN만 좁게 허용하세요
  //     // { protocol: 'https', hostname: 'cdn.example.com', pathname: '/**' },
  //   ],
  // },
  // // 번들 최적화 MUI deep import
  // modularizeImports: {
  //   '@mui/material': { transform: '@mui/material/{{member}}' },
  //   '@mui/icons-material': { transform: '@mui/icons-material/{{member}}' },
  // },
  // // eslint 범위
  // eslint: {
  //   dirs: ['src', 'app'], // 검사할 디렉토리
  // },
  // TurboPack 설정 - svgr
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  // webpack 설정 - svgr
  webpack: (config) => {
    // @ts-expect-error 타입 에러 무시
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true,
              ext: 'tsx',
            },
          },
        ],
      },
    );
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
};

export default withNextIntl(nextConfig);
