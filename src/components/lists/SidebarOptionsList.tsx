import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';

interface SidebarOption {
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
  url: string;
}

interface ISidebarOptionsListProps {
  options: SidebarOption[];
}

const SidebarList = ({ options }: ISidebarOptionsListProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index: number, url: string): void => {
    setSelectedIndex(index);
  };

  return (
    <List component="nav">
      {options.map((option, index) => (
        <Link to={option.url} component={RouterLink} key={option.title}>
          <ListItemButton
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index, option.url)}
            sx={{ pl: 4 }}
          >
            <ListItemIcon>{<option.icon />}</ListItemIcon>

            <ListItemText primary={option.title} />
          </ListItemButton>
        </Link>
      ))}
    </List>
  );
};

export default SidebarList;
