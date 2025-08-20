// 'use client';
import React from 'react';

import { Button, Badge, Box, Slider, Stack, Switch } from '@mui/material';

import SegmentedProgressBar from '@/shared/ui/components/SegmentedProgressbar';
import AppIcon from '@/shared/ui/icons/AppIcon';

import TestChangeLocale from './TestChangeLocale';

// import { useTranslations } from 'next-intl';
// import { getTranslations } from 'next-intl/server';

const dummyDelayForLoadingTest = async () =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, 2000),
  );
export const FleetMapPage = async () => {
  // const t = await getTranslations('home');
  // const t = useTranslations('home');
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
      <TestChangeLocale />
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
        <AppIcon name="battery" />
        <AppIcon name="battery" fontSize="large" />
        <AppIcon name="battery" color={'warning'} />

        <AppIcon name="pms" />
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
