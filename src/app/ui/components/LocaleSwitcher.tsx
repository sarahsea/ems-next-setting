import { useLocale, useTranslations } from 'next-intl';
import LangSelect from './LangSelect';
import type { Locale } from '@/i18n/config';

export default function LocaleSwitcher() {
  const t = useTranslations('LOCALE');
  const locale = useLocale();

  return (
    <LangSelect
      defaultValue={locale as Locale}
      locales={[
        { value: 'en', label: t('en') },
        { value: 'ko', label: t('ko') },
      ]}
    />
  );
}
