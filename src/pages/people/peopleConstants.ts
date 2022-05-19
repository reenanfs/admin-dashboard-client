import { GridColDef } from '@mui/x-data-grid';

export const COLUMNS: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    editable: false,
  },
  {
    field: 'role',
    headerName: 'Role',
    flex: 1,
    editable: false,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    editable: false,
  },
];

export const MAIN_TABLE_LABEL = 'Manage People';

export const ADD_DIALOG_TITLE = 'Add New Person';

export const ADD_FORM_ID = 'add-person-form';
