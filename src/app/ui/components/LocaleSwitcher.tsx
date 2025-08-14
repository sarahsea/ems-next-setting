import { useLocale, useTranslations } from 'next-intl';
import LangSelect from './LangSelect';

export default function LocaleSwitcher() {
  const t = useTranslations('LOCALE');
  const locale = useLocale();

  return (
    <LangSelect
      defaultValue={locale}
      locales={[
        { value: 'en', label: t('en') },
        { value: 'ko', label: t('ko') },
      ]}
    />
  );
}
