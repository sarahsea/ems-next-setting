'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useEffect, useState, useTransition } from 'react';

type Props = {
  initialLocale: string;
  initialMessages: Record<string, any>;
};

export default function ClientIntlProvider({
  initialLocale,
  initialMessages,
}: Props) {
  const [locale, setLocale] = useState(initialLocale);
  const [messages, setMessages] = useState(initialMessages);
  const [pending, startTransition] = useTransition();

  // 외부에서 쓰기 위한 전역 함수(간단히)
  useEffect(() => {
    (window as any).__setLocale = (next: string) => {
      if (next === locale) return;
      startTransition(async () => {
        // 1) 메시지 로드 (동적 import로 코드 스플리팅)
        const mod = await import(`../../../messages/${next}.json`);
        setMessages(mod.default);
        setLocale(next);
        // 2) 쿠키는 백그라운드로 설정 (응답 기다리지 않음)
        navigator.sendBeacon('/api/locale', JSON.stringify({ locale: next }));
      });
    };
  }, [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* 필요하면 로딩 상태로 버튼만 비활성화하는 등 */}
      {/* <PendingOverlay show={pending} /> */}
      {/** children은 루트 레이아웃이 감쌉니다 */}
      {null}
    </NextIntlClientProvider>
  );
}
