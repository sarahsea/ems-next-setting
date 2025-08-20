import { getTranslations } from 'next-intl/server';

export const Device = async () => {
  const t = await getTranslations('home');

  return (
    <div>
      MonitoringDevice
      <div>test i18n</div>
      <div> {t('title')}</div>
    </div>
  );
};
