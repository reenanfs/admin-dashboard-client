import { Box, Button, Typography } from '@mui/material';
import { routesPaths } from 'constants/routes';
import { useNavigate } from 'react-router-dom';

const NotFound = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h1">Oops!</Typography>
      <Typography variant="h6">
        The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate(routesPaths.HOME)}
        sx={{ mt: 3 }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
