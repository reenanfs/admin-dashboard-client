import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';

import SidebarOptionsList from 'components/lists/SidebarOptionsList';

interface ISidebarProps {
  sidebarProps: { sidebarOpen: boolean; sidebarWidth: number };
}

const sidebarOptions = [
  { title: 'Home', icon: <HomeIcon />, url: '/' },
  { title: 'People', icon: <PersonIcon />, url: '/people' },
];

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
      <Box>
        <SidebarOptionsList options={sidebarOptions} />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
