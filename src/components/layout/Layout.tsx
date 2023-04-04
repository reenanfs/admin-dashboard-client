import { ReactNode, useEffect, useState } from 'react';

import Box from '@mui/material/Box';

import Navbar from 'components/navbar/Navbar';
import Sidebar from 'components/sidebar/Sidebar';
import AppContainer from 'components/containers/AppContainer';
import { useLocation } from 'react-router-dom';
import { routesPaths } from 'constants/routesConstants';

interface iLayoutProps {
  children: ReactNode;
}

const sidebarWidth = 240;

const Layout = ({ children }: iLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [siteNavigationVisible, setSiteNavigationVisible] = useState(false);

  let location = useLocation();

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

  const appContainerProps = {
    sidebarOpen,
    sidebarWidth,
  };

  useEffect(() => {
    const RoutesWhereNavigationHidden: string[] = [
      routesPaths.LOGIN,
      routesPaths.REGISTER,
    ];

    const isPathOnHiddenList = RoutesWhereNavigationHidden.includes(
      location.pathname
    );

    const IsPathUnmapped = Object.values(routesPaths).includes(
      location.pathname as routesPaths
    );

    if (isPathOnHiddenList || !IsPathUnmapped) {
      setSiteNavigationVisible(false);
    } else {
      setSiteNavigationVisible(true);
    }
  }, [location.pathname]);

  const renderSiteNavigation = (): JSX.Element => {
    if (siteNavigationVisible) {
      return (
        <>
          <Navbar navbarProps={navbarProps} />
          <Sidebar sidebarProps={sidebarProps} />
        </>
      );
    }
    return <></>;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {renderSiteNavigation()}
      <AppContainer appContainerProps={appContainerProps}>
        {children}
      </AppContainer>
    </Box>
  );
};

export default Layout;
