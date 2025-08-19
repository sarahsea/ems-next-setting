import React from 'react';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LocaleSwitcher from './LocaleSwitcher';
import ThemeModeSelect from './ThemeModeSelect';

function Header({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '64px',
          alignItems: 'center',
          padding: '0 16px',
        }}
      >
        <IconButton
          aria-label="toggle sidebar"
          onClick={onToggleSidebar}
          size="large"
        >
          <MenuIcon />
        </IconButton>
        헤더 영역
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <ThemeModeSelect />
          <LocaleSwitcher />
        </Box>
      </Box>
    </AppBar>
  );
}

export default Header;
