import { Chip } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';

const StatusCell = (params: GridRenderCellParams) => {
  if (params.value) {
    return <Chip label="Completed" color="success" />;
  }
  return <Chip label="Not Completed" color="warning" />;
};

export default StatusCell;
