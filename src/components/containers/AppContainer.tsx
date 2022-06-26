import { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';

interface IAppContainerProps {
  appContainerProps: {
    sidebarOpen: boolean;
    sidebarWidth: number;
  };
  children: ReactNode;
}

const AppContainer = ({ appContainerProps, children }: IAppContainerProps) => {
  const { sidebarOpen, sidebarWidth } = appContainerProps;

  const StyledContainer = styled(Box, {
    shouldForwardProp: prop => prop !== 'open',
  })<{
    open?: boolean;
  }>(({ open }) => ({
    ...(!open && { marginLeft: `-${sidebarWidth}px` }),
  }));

  return (
    <>
      <StyledContainer sx={{ padding: 5, width: '100%' }} open={sidebarOpen}>
        <Toolbar />
        {children}
      </StyledContainer>
      ;
    </>
  );
};

export default AppContainer;
