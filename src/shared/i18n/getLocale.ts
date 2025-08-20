import { cookies } from 'next/headers';

import { COOKIE_NAME, defaultLocale } from '@/shared/i18n/config';

export async function getUserLocale() {
  return (await cookies()).get(COOKIE_NAME)?.value || defaultLocale;
}
