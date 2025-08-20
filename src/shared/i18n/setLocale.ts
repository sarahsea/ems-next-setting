'use server';
import { cookies } from 'next/headers';

import { Locale, COOKIE_NAME } from '@/shared/i18n/config';

export async function setUserLocaleAction(locale: Locale) {
  const cookie = await cookies();
  cookie.set(COOKIE_NAME, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    httpOnly: false, // 필요에 따라 true/false
  });
}
