import { ReactNode, useState } from 'react';

import Box from '@mui/material/Box';

import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';

interface iLayoutProps {
  children: ReactNode;
}

const sidebarWidth = 240;

const Layout = ({ children }: iLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const navbarProps = {
    sidebarOpen,
    handleSidebarOpen,
    handleSidebarClose,
  };

  const sidebarProps = {
    sidebarOpen,
    sidebarWidth,
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar navbarProps={navbarProps} />
      <Sidebar sidebarProps={sidebarProps} />
      {children}
    </Box>
  );
};

export default Layout;
