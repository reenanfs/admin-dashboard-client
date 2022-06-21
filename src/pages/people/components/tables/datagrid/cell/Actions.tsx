import { GridRowParams } from '@mui/x-data-grid';
import ActionCellEdit from './ActionCellEdit';
import ActionCellDelete from './ActionCellDelete';
import { Person } from 'pages/people/peopleTypes';

const Actions = (params: GridRowParams) => [
  <ActionCellEdit defaultValues={params.row as Person} />,
  <ActionCellDelete id={params.id} />,
];

export default Actions;
