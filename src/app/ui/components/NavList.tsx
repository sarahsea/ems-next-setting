// app/_components/NavList.tsx
'use client';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

export function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <List
      aria-label="main navigation"
      sx={{ width: '100%', py: 0 }}
      role="navigation"
    >
      <ListItemButton onClick={onNavigate}>
        <ListItemIcon>
          <HomeRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Fleet Map" />
      </ListItemButton>

      <ListItemButton onClick={onNavigate}>
        <ListItemIcon>
          <SettingsRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Monitoring" />
      </ListItemButton>

      <ListItemButton onClick={onNavigate}>
        <ListItemIcon>
          <InfoRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItemButton>
    </List>
  );
}
