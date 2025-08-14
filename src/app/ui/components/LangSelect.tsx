'use client';
import { useState, useTransition } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { setUserLocale } from '@/service/locale';
import { Locale } from '@/i18n/config';
import { useRouter } from 'next/navigation';

type Props = {
  defaultValue: Locale;
  locales: Locale[];
  label?: string;
};

export default function LocaleSelect({ defaultValue, locales, label }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleChange = (e) => {
    const value = e.target.value;
    startTransition(() => {
      setUserLocale(value as Locale);
    });
  };
  return (
    <Select
      value={defaultValue}
      defaultValue="en"
      onChange={handleChange}
      disabled={isPending}
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="ko">Korean</MenuItem>
    </Select>
  );
}
