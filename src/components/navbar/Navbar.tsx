import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface iNavbarProps {
  navbarProps: {
    sidebarOpen: boolean;
    handleSidebarOpen: () => void;
    handleSidebarClose: () => void;
  };
}

const Navbar = ({ navbarProps }: iNavbarProps) => {
  const { sidebarOpen, handleSidebarOpen, handleSidebarClose } =
    navbarProps;

  return (
    <AppBar
      sx={{
        zIndex: theme => theme.zIndex.drawer + 1,
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;',
      }}
    >
      <Toolbar>
        <IconButton
          onClick={
            sidebarOpen ? handleSidebarClose : handleSidebarOpen
          }
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
