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
