import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      gap={4}
    >
      <Typography variant="h1">Math Platform</Typography>
      <Typography variant="h4">Aprende matemáticas a tu ritmo</Typography>

      <Button variant="contained" size="large" component={Link} to="/dashboard">
        Comenzar ahora
      </Button>
    </Box>
  );
};

export default HomePage;
