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

export const MAIN_TABLE_LABEL = 'Manage Users';

export const ADD_DIALOG_TITLE = 'Add New User';

export const EDIT_DIALOG_TITLE = 'Edit User';

export const DELETE_DIALOG_TITLE = 'Delete ser';

export const DELETE_DIALOG_CONTENT =
  'Are you sure you want to delete this user';

export const DELETE_MULTIPLE_DIALOG_TITLE = 'Delete Users';

export const DELETE_MULTIPLE_DIALOG_CONTENT =
  'Are you sure you want to delete the selected users?';

export const users_FORM_ID = 'users-form-id';
