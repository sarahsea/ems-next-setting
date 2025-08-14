'use client';
import { useState, useTransition } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { setUserLocale } from '@/service/locale';
import { Locale } from '@/i18n/config';
import { useRouter } from 'next/navigation';

export default function LangSelect() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [locale, setLocale] = useState('en');
  const handleChange = (e) => {
    const value = e.target.value;
    if (value === locale) return; // No change
    startTransition(async () => {
      await setUserLocale(value as Locale);
      setLocale(value);
      router.refresh();
    });
  };
  return (
    <Select
      value={locale}
      defaultValue="en"
      onChange={handleChange}
      disabled={isPending}
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="ko">Korean</MenuItem>
    </Select>
  );
}
