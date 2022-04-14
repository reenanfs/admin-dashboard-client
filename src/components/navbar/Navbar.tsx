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

interface iNavbarProps {
  navbarProps: {
    sidebarOpen: boolean;
    handleSidebarOpen: () => void;
    handleSidebarClose: () => void;
  };
}

const settings = ['Logout'];

const Navbar = ({ navbarProps }: iNavbarProps) => {
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
          onClick={sidebarOpen ? handleSidebarClose : handleSidebarOpen}
        >
          <MenuIcon color="inherit" />
        </IconButton>
        <AssignmentIcon sx={{ ml: 6 }} />
        <Typography color="primary" variant="h6" component="span" ml={1}>
          Tasks
        </Typography>
        <Typography color="default" variant="h6" component="span" ml={1}>
          Manager
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ mr: 2 }}>
          <IconButton
            size="large"
            sx={{
              marginRight: 3,
            }}
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="" src="">
              R
            </Avatar>
          </IconButton>
          <Menu
            sx={{ mt: '40px', ml: '21px' }}
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
            {settings.map(setting => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
