import { ReactNode } from 'react';

import Box from '@mui/material/Box';

import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';

interface iLayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: iLayoutProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Sidebar />
      {children}
    </Box>
  );
};

export default Layout;
