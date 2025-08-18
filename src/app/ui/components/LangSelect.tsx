'use client';
import { useState, useTransition } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';
import { Locale } from '@/shared/i18n/config';
import { setUserLocaleAction } from '@/shared/i18n/setLocale';

type Props = {
  defaultValue: Locale;
  locales: { value: Locale; label: string }[];
};

export default function LocaleSelect({ defaultValue, locales }: Props) {
  const [value, setValue] = useState(defaultValue ?? 'en');
  const [isPending, startTransition] = useTransition();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (localeValue: Locale) => {
    startTransition(() => {
      setUserLocaleAction(localeValue);
      setValue(localeValue);
      setAnchorEl(null);
    });
  };

  return (
    <>
      <IconButton
        aria-label="change language"
        onClick={handleIconClick}
        disabled={isPending}
        size="large"
      >
        <LanguageIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {locales?.map((locale, idx) => (
          <MenuItem
            key={locale.value + idx}
            selected={value === locale.value}
            onClick={() => handleMenuItemClick(locale.value)}
          >
            {locale.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
