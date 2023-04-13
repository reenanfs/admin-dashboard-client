import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeIcon from '@mui/icons-material/Home';

import SidebarOptionsList from 'components/lists/SidebarOptionsList';
import { routesPaths } from 'constants/routesConstants';

interface ISidebarProps {
  sidebarProps: { sidebarOpen: boolean; sidebarWidth: number };
}

const sidebarOptions = [
  { title: 'Home', icon: <HomeIcon />, url: routesPaths.HOME },
  { title: 'Tasks', icon: <AssignmentIcon />, url: routesPaths.TASKS },
  { title: 'People', icon: <PeopleIcon />, url: routesPaths.PEOPLE },
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
