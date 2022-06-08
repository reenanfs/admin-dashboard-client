import { GridColumns } from '@mui/x-data-grid';
import Actions from './components/tables/datagrid/cell/Actions';

export const COLUMNS: GridColumns = [
  {
    field: 'name',
    type: 'string',
    headerName: 'Name',
    flex: 1,
    editable: false,
  },
  {
    field: 'role',
    type: 'string',
    headerName: 'Role',
    flex: 1,
    editable: false,
  },
  {
    field: 'email',
    type: 'string',
    headerName: 'Email',
    flex: 1,
    editable: false,
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    flex: 1,
    editable: false,
    getActions: Actions,
  },
];

export const MAIN_TABLE_LABEL = 'Manage People';

export const ADD_DIALOG_TITLE = 'Add New Person';

export const ADD_FORM_ID = 'add-person-form';
