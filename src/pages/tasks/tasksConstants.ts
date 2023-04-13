import { GridColumns } from '@mui/x-data-grid';
import Actions from './components/tables/datagrid/cell/Actions';
import StatusCell from './components/tables/datagrid/cell/StatusCell';

export const COLUMNS: GridColumns = [
  {
    field: 'name',
    type: 'string',
    headerName: 'Name',
    flex: 1,
    editable: false,
  },
  {
    field: 'person',
    type: 'string',
    headerName: 'Person',
    flex: 1,
    editable: false,
  },
  {
    field: 'dueDate',
    type: 'dateTime',
    headerName: 'Due Date',
    flex: 1,
    editable: false,
    valueGetter: ({ value }) => value && new Date(value),
  },
  {
    field: 'completed',
    headerName: 'Status',
    flex: 1,
    editable: false,
    renderCell: StatusCell,
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

export const MAIN_TABLE_LABEL = 'Manage Tasks';

export const ADD_DIALOG_TITLE = 'Add New Task';

export const EDIT_DIALOG_TITLE = 'Edit Task';

export const DELETE_DIALOG_TITLE = 'Delete Task';

export const DELETE_DIALOG_CONTENT =
  'Are you sure you want to delete this task?';

export const DELETE_MULTIPLE_DIALOG_TITLE = 'Delete Tasks';

export const DELETE_MULTIPLE_DIALOG_CONTENT =
  'Are you sure you want to delete the selected tasks?';

export const TASKS_FORM_ID = 'task-form-id';
