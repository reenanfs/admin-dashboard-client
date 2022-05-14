import { GridColDef } from '@mui/x-data-grid';

export const label = 'Manage People';

export interface PeopleGridRowDef {
  id: number | string;
  name: string;
  role: string;
  email: string;
}

export const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    editable: true,
  },
  {
    field: 'role',
    headerName: 'Role',
    flex: 1,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    editable: true,
  },
];
