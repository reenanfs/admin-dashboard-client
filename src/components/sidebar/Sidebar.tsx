import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';

import SidebarList from 'components/lists/SidebarOptionsList';

interface ISidebarProps {
  sidebarProps: { sidebarOpen: boolean; sidebarWidth: number };
}

const sidebarOptions = [
  { title: 'Home', icon: HomeIcon, url: '/' },
  { title: 'People', icon: PersonIcon, url: '/people' },
  { title: 'Support', icon: ContactSupportIcon, url: '/support' },
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
        <SidebarList options={sidebarOptions} />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
