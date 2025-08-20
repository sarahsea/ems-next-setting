import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function loading() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Skeleton variant="text" width="20%" height={40} />
      <Skeleton variant="text" width="30%" />
      <Skeleton variant="rectangular" width={'70%'} height={118} />
    </Box>
  );
}
