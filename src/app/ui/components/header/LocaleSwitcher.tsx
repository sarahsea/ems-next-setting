import { useLocale, useTranslations } from 'next-intl';

import LangSelect from './LangSelect';

import type { Locale } from '@/shared/i18n/setting/config';

export default function LocaleSwitcher() {
  const t = useTranslations('shared');
  const locale = useLocale();

  return (
    <LangSelect
      defaultValue={locale as Locale}
      locales={[
        { value: 'en', label: t('locale_en') },
        { value: 'ko', label: t('locale_ko') },
      ]}
    />
  );
}
