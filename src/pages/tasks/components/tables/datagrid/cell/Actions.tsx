import { GridRowParams } from '@mui/x-data-grid';
import ActionDeleteCell from 'components/tables/datagrid/cell/ActionDeleteCell';
import ActionEditCell from 'components/tables/datagrid/cell/ActionEditCell';
import { ITask } from 'types/tasksTypes.ts';

const Actions = (params: GridRowParams) => [
  <ActionEditCell defaultValues={params.row as ITask} />,
  <ActionDeleteCell id={params.id} />,
];

export default Actions;
