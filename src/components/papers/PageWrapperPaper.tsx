import { Box, Paper } from '@mui/material';
import { ReactNode } from 'react';

interface IPageWrapperPaperProps {
  children: ReactNode;
}

const PageWrapperPaper = ({
  children,
}: IPageWrapperPaperProps): JSX.Element => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Paper sx={{ flexGrow: 1 }}>{children}</Paper>
    </Box>
  );
};

export default PageWrapperPaper;
