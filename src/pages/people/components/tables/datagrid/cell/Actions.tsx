import { GridRowParams } from '@mui/x-data-grid';
import { IPerson } from 'types/peopleTypes';
import ActionDeleteCell from 'components/tables/datagrid/cell/ActionDeleteCell';
import ActionEditCell from 'components/tables/datagrid/cell/ActionEditCell';

const Actions = (params: GridRowParams) => [
  <ActionEditCell defaultValues={params.row as IPerson} />,
  <ActionDeleteCell id={params.id} />,
];

export default Actions;
