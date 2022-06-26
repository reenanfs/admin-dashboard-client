import { GridRowParams } from '@mui/x-data-grid';
import ActionCellEdit from './ActionCellEdit';
import ActionCellDelete from './ActionCellDelete';
import { ITask } from 'pages/home/homeTypes';

const Actions = (params: GridRowParams) => [
  <ActionCellEdit defaultValues={params.row as ITask} />,
  <ActionCellDelete id={params.id} />,
];

export default Actions;
