import { GridColDef } from '@mui/x-data-grid';

export const label = 'Manage Tasks';

export interface HomeGridRowDef {
  id: number | string;
  taskName: string;
  description: string;
  startDate: string;
  person: string;
  dueDate: string;
}

export const columns: GridColDef[] = [
  {
    field: 'taskName',
    headerName: 'Task Name',
    flex: 1,
    editable: true,
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 1,
    editable: true,
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    flex: 1,
    editable: true,
  },
  {
    field: 'person',
    headerName: 'Person',
    flex: 1,
    editable: true,
  },
  {
    field: 'dueDate',
    headerName: 'Due Date',
    flex: 1,
    editable: true,
  },
];
