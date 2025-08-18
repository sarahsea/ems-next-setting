import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/shared/i18n/requests.ts');
const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
