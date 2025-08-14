import ThemeModeSelect from '@/app/ui/components/ThemeModeSelect';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';
import React from 'react';

const dummyDelayForLoadingTest = async () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 2000),
  );
export const FleetMapPage = async () => {
  await dummyDelayForLoadingTest();
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
      }}
    >
      <h1>Fleet Map</h1>
      <p>This is the Fleet Map page.</p>
      <ThemeModeSelect />
      <Stack
        sx={{
          width: '100%',
          borderRadius: '4px',
          p: 2,
          gap: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.default',
          color: 'text.primary',
          // transition: "1s",
        }}
      >
        <Slider />
        <Switch />
        <ToggleButton></ToggleButton>
        <Badge />
      </Stack>
    </Box>
  );
};
