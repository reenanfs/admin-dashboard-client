import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

interface ISidebarProps {
  sidebarProps: { sidebarOpen: boolean; sidebarWidth: number };
}

const Sidebar = ({ sidebarProps }: ISidebarProps) => {
  const { sidebarOpen, sidebarWidth } = sidebarProps;

  return (
    <Drawer open={sidebarOpen} variant="persistent">
      <Toolbar />
      <Box
        sx={{
          width: sidebarWidth,
        }}
      >
        <button>Submit</button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
