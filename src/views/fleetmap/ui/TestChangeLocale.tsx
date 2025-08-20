'use client';
import { useTranslations } from 'next-intl';

export default function TestChangeLocale() {
  const t = useTranslations();
  return (
    <div>
      <h1>Test Change Locale</h1>
      <p>{t('home.title')}</p>
    </div>
  );
}
