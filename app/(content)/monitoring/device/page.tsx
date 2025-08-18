import { getTranslations } from 'next-intl/server';

async function MonitoringDevice() {
  const t = await getTranslations('home');
  return (
    <div>
      MonitoringDevice
      <div>test i18n</div>
      <div> {t('title')}</div>
    </div>
  );
}

export default MonitoringDevice;
