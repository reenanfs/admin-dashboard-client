import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

interface ISidebarOption {
  title: string;
  icon: React.ReactNode;
  url: string;
}

interface ISidebarOptionsListProps {
  options: ISidebarOption[];
}

const SidebarOptionsList = ({ options }: ISidebarOptionsListProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  let location = useLocation();

  const handleListItemClick = (index: number): void => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    let sidebarIndex: number | null = null;

    options.forEach(({ url }, index) => {
      if (url === location.pathname) {
        sidebarIndex = index;
      }
    });

    setSelectedIndex(sidebarIndex);
  }, [location.pathname, options]);

  return (
    <List component="nav" sx={{ p: 0 }}>
      {options.map((option, index) => (
        <Link to={option.url} component={RouterLink} key={option.title}>
          <ListItemButton
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index)}
            sx={{ p: 2 }}
          >
            <ListItemIcon>{option.icon}</ListItemIcon>

            <ListItemText primary={option.title} />
          </ListItemButton>
        </Link>
      ))}
    </List>
  );
};

export default SidebarOptionsList;
