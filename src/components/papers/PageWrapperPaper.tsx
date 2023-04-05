import { Paper } from '@mui/material';
import { ReactNode } from 'react';

interface IPageWrapperPaperProps {
  children: ReactNode;
}

const PageWrapperPaper = ({
  children,
}: IPageWrapperPaperProps): JSX.Element => {
  return (
    <Paper
      sx={{
        height: '80vh',
        width: '100%',
        padding: 2,
      }}
    >
      {children}
    </Paper>
  );
};

export default PageWrapperPaper;
