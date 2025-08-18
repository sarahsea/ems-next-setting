import SegmentedProgressBar from '@/shared/ui/components/SegmentedProgressbar';
import { Button } from '@mui/material';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const dummyDelayForLoadingTest = async () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 2000),
  );
export const FleetMapPage = async () => {
  const t = await getTranslations('home');
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
      <p>{t('title')}</p>
      {/* <ThemeModeSelect /> */}

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
        {/* <ToggleButton></ToggleButton> */}
        <Badge variant="dot" color="success" />
        <Button variant="contained" color="secondary">
          Click Me
        </Button>
        <SegmentedProgressBar label="SOH" value={98.2} color="secondary" />
      </Stack>
    </Box>
  );
};
