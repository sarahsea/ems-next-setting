'use server';
import { cookies } from 'next/headers';

import {
  Locale,
  COOKIE_NAME,
  defaultLocale,
} from '@/shared/i18n/setting/config';

export async function getUserLocale() {
  return (await cookies()).get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  const cookie = await cookies();
  cookie.set(COOKIE_NAME, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    httpOnly: false, // 필요에 따라 true/false
  });
}
