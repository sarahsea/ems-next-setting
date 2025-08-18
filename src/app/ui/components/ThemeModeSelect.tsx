'use client';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';

type Mode = 'system' | 'light' | 'dark';

function ThemeModeSwitcher() {
  const [value, setValue] = useState<Mode>('system');
  const { setMode } = useColorScheme();
  // Cycle through theme modes: system → dark → light → system
  const cycleMode = () => {
    let nextMode: Mode = 'system';
    if (value === 'system') nextMode = 'dark';
    else if (value === 'dark') nextMode = 'light';
    else if (value === 'light') nextMode = 'system';
    setValue(nextMode);
    setMode(nextMode);
  };

  // Choose icon based on current mode
  let icon = <SettingsBrightnessIcon />;
  if (value === 'light') icon = <LightModeIcon />;
  if (value === 'dark') icon = <DarkModeIcon />;

  return (
    <IconButton aria-label="change theme mode" onClick={cycleMode} size="large">
      {icon}
    </IconButton>
  );
}

export default ThemeModeSwitcher;
