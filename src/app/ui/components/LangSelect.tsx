'use client';
import { useState, useTransition } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { setUserLocale } from '@/service/locale';
import { Locale } from '@/i18n/config';

type Props = {
  defaultValue: Locale;
  locales: { value: Locale; label: string }[];
  label?: string;
};

export default function LocaleSelect({ defaultValue, locales, label }: Props) {
  const [value, setValue] = useState(defaultValue ?? 'en');
  const [isPending, startTransition] = useTransition();
  const handleChange = (e) => {
    const value = e.target.value;
    startTransition(() => {
      setUserLocale(value as Locale);
      setValue(value as Locale);
    });
  };
  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      disabled={isPending}
    >
      {locales?.map((locale, idx) => (
        <MenuItem key={locale.value + idx} value={locale.value}>
          {locale.label}
        </MenuItem>
      ))}
      {/* <MenuItem value="en">English</MenuItem>
      <MenuItem value="ko">Korean</MenuItem> */}
    </Select>
  );
}
