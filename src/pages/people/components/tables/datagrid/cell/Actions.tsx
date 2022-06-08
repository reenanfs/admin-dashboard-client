import { GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';

const Actions = (params: GridRowParams) => [
  <GridActionsCellItem
    icon={<Edit />}
    label="Edit"
    onClick={() => console.log(params)}
  />,
  <GridActionsCellItem
    icon={<Delete />}
    label="Delete"
    onClick={() => console.log(params)}
  />,
];

export default Actions;
