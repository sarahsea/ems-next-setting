'use client';
import React from 'react';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import moment from 'moment-timezone';

import { getTimezone } from '@/shared/lib/timezone/tz-lookup';

dayjs.extend(utc);
dayjs.extend(timezone);

function formatWithAbbr(d: dayjs.Dayjs, tzId: string) {
  const datePart = d.format('YYYY-MM-DD HH:mm:ss');
  const abbr = new Intl.DateTimeFormat('en-US', {
    timeZone: tzId,
    timeZoneName: 'short',
  })
    .formatToParts(d.toDate())
    .find((p) => p.type === 'timeZoneName')?.value;
  return `${datePart} ${abbr}`;
}

export const Sites = () => {
  const utcDayjs = dayjs.utc();
  console.log('utcDayjs', utcDayjs);
  const utcNow = dayjs.utc().valueOf();
  const locale = 'en-GB';
  const timezone = 'Europe/Bratislava';
  const intl = new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    timeZoneName: 'short',
  });
  const shortTimezone = intl.format(utcNow).split(' ')[1];

  //
  // 서버에서 받은 UTC 기준 timestamp (예: 초 단위 → ms로 변환)
  const serverUtcTimestamp = 1723558800000; // 예시: 2024-08-13 00:00:00 UTC

  // 1) 브라우저 로컬 시간
  const localTime = dayjs.utc(serverUtcTimestamp).local();
  // e.g., "2024-08-13 09:00:00 +09:00" (한국 브라우저 환경일 경우)
  const seoulTime = dayjs.utc(serverUtcTimestamp).tz('Asia/Seoul');

  // 2) 지정한 타임존 (예: Australia/Perth)
  const perthTime = dayjs.utc(serverUtcTimestamp).tz('Australia/Perth');
  // e.g., "2024-08-13 08:00:00 +08:00"
  // 2) 지정한 타임존 (예: Australia/Perth)
  const melbourneTime = dayjs.utc(serverUtcTimestamp).tz('Australia/Melbourne');
  // 3) 지정한 타임존 (예: America/New_York)
  const nyTime = dayjs.utc(serverUtcTimestamp).tz('America/New_York');
  // e.g., "2024-08-12 20:00:00 -04:00"
  // UTC 기준 표시
  const utcTime = dayjs.utc(serverUtcTimestamp);

  // moment
  // 3) 지정 타임존 (예: America/New_York)
  const momentNyTime = moment.utc(serverUtcTimestamp).tz('America/New_York');

  // 4) 지정 타임존 (예: Australia/Perth)
  const momentPerthTime = moment.utc(serverUtcTimestamp).tz('Australia/Perth');

  return (
    <>
      <div>sites</div>
      <div>
        <p>UTC: {utcNow}</p>

        <p>Locale: {locale}</p>
        <p>Intl: {intl.format(utcNow)}</p>
        <p>Timezone: {shortTimezone}</p>
        <p>Dayjs: {dayjs(utcNow).format('YYYY-MM-DD HH:mm:ss Z')}</p>
        <p>
          Dayjs (timezone):{' '}
          {dayjs().tz(timezone).format('YYYY-MM-DD HH:mm:ss Z')}
        </p>
      </div>
      <div>
        <p>new Date():{new Date().toLocaleString()}</p>
        <p>
          Current Date by Time Zone:{' '}
          {new Date().toLocaleString(locale, { timeZone: timezone })}
        </p>
      </div>
      <div>
        <h4>Dayjs</h4>
        <p>utc timestamp: {serverUtcTimestamp}</p>
        <p>utc formatted: {utcTime.format('YYYY-MM-DD HH:mm:ss [UTC]')}</p>
        <p>Local Time: {localTime.format('YYYY-MM-DD HH:mm:ss Z')}</p>
        <p>Seoul Time: {seoulTime.format('YYYY-MM-DD HH:mm:ss Z')}</p>
        <p>Perth Time: {perthTime.format('YYYY-MM-DD HH:mm:ss Z')}</p>
        <p>Melbourne Time: {melbourneTime.format('YYYY-MM-DD HH:mm:ss Z')}</p>
        <p>New York Time: {nyTime.format('YYYY-MM-DD HH:mm:ss Z')}</p>
        <h4>Formatted with Abbreviation</h4>
        <p>
          {formatWithAbbr(
            localTime,
            Intl.DateTimeFormat().resolvedOptions().timeZone,
          )}
        </p>
        <p>{formatWithAbbr(seoulTime, 'Asia/Seoul')}</p>
        <p>{formatWithAbbr(perthTime, 'Australia/Perth')}</p>
        <p>{formatWithAbbr(melbourneTime, 'Australia/Melbourne')}</p>
        <p>{formatWithAbbr(nyTime, 'America/New_York')}</p>
        <p>{formatWithAbbr(utcTime, 'UTC')}</p>
      </div>

      <div>
        <h4>moment</h4>
        <p>utc timestamp: {serverUtcTimestamp}</p>
        <p>
          utc formatted:{' '}
          {moment.utc(serverUtcTimestamp).format('YYYY-MM-DD HH:mm:ss [UTC]')}
        </p>
        <p>New York Time: {momentNyTime.format('YYYY-MM-DD HH:mm:ss z')}</p>
        <p>Perth Time: {momentPerthTime.format('YYYY-MM-DD HH:mm:ss z')}</p>
      </div>
      <div>
        <h4>TZ-lookup</h4>
        <p>브라슬라바: {getTimezone(48.1482, 17.1067)}</p>
        <p>서울: {getTimezone(37.608377, 127.00023)}</p>
        <p>멜버른: {getTimezone(-37.8136, 144.9631)}</p>
        <p>뉴욕: {getTimezone(40.7128, -74.006)}</p>
        <p>퍼스: {getTimezone(-31.9505, 115.8605)}</p>
        <p>런던: {getTimezone(51.5074, -0.1278)}</p>
        <p>파리: {getTimezone(48.8566, 2.3522)}</p>
        <br />
      </div>
      <br />
    </>
  );
};
