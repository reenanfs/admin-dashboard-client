import { GridRowParams } from '@mui/x-data-grid';
import ActionCellEdit from './ActionCellEdit';
import ActionDeleteCell from 'components/tables/datagrid/cell/ActionDeleteCell';
import { ITask } from 'pages/home/homeTypes';

const Actions = (params: GridRowParams) => [
  <ActionCellEdit defaultValues={params.row as ITask} />,
  <ActionDeleteCell id={params.id} />,
];

export default Actions;
