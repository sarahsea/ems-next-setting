import React from 'react';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LocaleSwitcher from './LocaleSwitcher';
import ThemeModeSelect from './ThemeModeSelect';

function Header({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        height: '64px',
        alignItems: 'center',
        padding: '0 16px',
        // backgroundColor: '#f5f5f5',
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
  );
}

export default Header;
