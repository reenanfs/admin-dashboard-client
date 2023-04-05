import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useAuth } from 'hooks/useAuth';
import { useCurrentUser } from 'hooks/useCurrentUser';
import { useNavigate } from 'react-router-dom';
import { routesPaths } from 'constants/routesConstants';

interface INavbarProps {
  navbarProps: {
    sidebarOpen: boolean;
    handleSidebarOpen: () => void;
    handleSidebarClose: () => void;
  };
}

const Navbar = ({ navbarProps }: INavbarProps) => {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const { sidebarOpen, handleSidebarOpen, handleSidebarClose } = navbarProps;
  const [avatarAnchorEl, setAvatarAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAvatarAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAvatarAnchorEl(null);
  };

  const menuItems = [
    {
      text: 'Settings',
      onClick: () => {
        navigate(routesPaths.SETTINGS);
        handleCloseUserMenu();
      },
    },
    {
      text: 'Logout',
      onClick: () => {
        handleLogout(user?.credentialId!);
        handleCloseUserMenu();
      },
    },
  ];

  return (
    <AppBar
      sx={{
        zIndex: theme => theme.zIndex.drawer + 1,
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;',
      }}
      color="default"
    >
      <Toolbar>
        <IconButton
          id="menuButton"
          onClick={sidebarOpen ? handleSidebarClose : handleSidebarOpen}
        >
          <MenuIcon color="inherit" />
        </IconButton>

        <AssignmentIcon color="primary" sx={{ ml: 6, fontSize: 30 }} />
        <Typography
          color="primary"
          variant="h6"
          component="span"
          ml={1}
          sx={{ fontWeight: 'bold' }}
        >
          Task
        </Typography>
        <Typography color="default" variant="h6" component="span" ml={1}>
          Manager
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ mr: 2 }}>
          <IconButton
            size="large"
            sx={{
              mr: 1,
            }}
          >
            <Badge color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar id="avatar" alt="" src="">
              {user?.name[0]}
            </Avatar>
          </IconButton>
          <Menu
            sx={{ mt: 5, ml: 3 }}
            anchorEl={avatarAnchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(avatarAnchorEl)}
            onClose={handleCloseUserMenu}
          >
            {menuItems.map(menuItem => (
              <MenuItem key={menuItem.text} onClick={menuItem.onClick}>
                <Typography>{menuItem.text}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
