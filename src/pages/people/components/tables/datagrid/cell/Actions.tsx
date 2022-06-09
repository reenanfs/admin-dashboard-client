import { GridActionsCellItem, GridRowParams } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';
import ActionCellEdit from './ActionCellEdit';
import { Person } from 'pages/people/peopleTypes';

const Actions = (params: GridRowParams) => [
  <ActionCellEdit defaultValues={params.row as Person} />,
  <GridActionsCellItem
    icon={<Delete />}
    label="Delete"
    onClick={() => console.log(params)}
  />,
];

export default Actions;
