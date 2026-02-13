import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export const PageSkeleton = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Skeleton variant="text" width="40%" height={40} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" height={100} />
    </Box>
  );
};
