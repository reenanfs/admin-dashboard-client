import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';

interface EnhancedTableToolbarProps {
  label: string;
}

const TableToolbar = (props: EnhancedTableToolbarProps) => {
  const { label } = props;

  return (
    <Toolbar>
      <Typography>{label}</Typography>
      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default TableToolbar;
