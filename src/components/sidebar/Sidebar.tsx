import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';

interface ISidebarProps {
  sidebarProps: { sidebarOpen: boolean; sidebarWidth: number };
}

const Sidebar = ({ sidebarProps }: ISidebarProps) => {
  const { sidebarOpen, sidebarWidth } = sidebarProps;

  return (
    <Drawer
      open={sidebarOpen}
      variant="persistent"
      sx={{
        width: sidebarWidth,
        [`& .MuiDrawer-paper`]: {
          width: sidebarWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box></Box>
    </Drawer>
  );
};

export default Sidebar;
