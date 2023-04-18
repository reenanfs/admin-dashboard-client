import { GridRowParams } from '@mui/x-data-grid';

import ActionDeleteCell from 'components/tables/datagrid/cell/ActionDeleteCell';
import ActionEditCell from 'components/tables/datagrid/cell/ActionEditCell';
import { IUserRows } from 'pages/users/usersTypes';

const Actions = (params: GridRowParams) => [
  <ActionEditCell defaultValues={params.row as IUserRows} />,
  <ActionDeleteCell id={params.id} />,
];

export default Actions;
