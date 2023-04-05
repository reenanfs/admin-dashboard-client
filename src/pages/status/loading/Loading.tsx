import { Box, CircularProgress, Typography } from '@mui/material';
import PageWrapperPaper from 'components/papers/PageWrapperPaper';

interface LoadingPageProps {
  message?: string;
}

const LoadingPage = ({ message }: LoadingPageProps): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h5" sx={{ mt: 3 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingPage;
