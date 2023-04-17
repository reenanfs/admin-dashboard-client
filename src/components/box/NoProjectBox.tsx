import { Box, Button, Typography } from '@mui/material';
import { routesPaths } from 'constants/routesConstants';
import { useNavigate } from 'react-router-dom';

const NoProjectsBox = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
      id="hehe"
    >
      <Typography variant="h4" align="center" gutterBottom>
        You have no projects
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Click the button below to create a new project.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate(routesPaths.SETTINGS_PROJECT)}
      >
        Create Project
      </Button>
    </Box>
  );
};

export default NoProjectsBox;
