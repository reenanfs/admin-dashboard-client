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

export const rows: PeopleGridRowDef[] = [
  {
    id: 1,
    name: 'Renan',
    role: 'Manager',
    email: 'renan.a@gmail.com',
  },
  {
    id: 2,
    name: 'Karina',
    role: 'Director',
    email: 'karina.b@gmail.com',
  },
  {
    id: 3,
    name: 'Irineu',
    role: 'CEO',
    email: 'irineu.c@gmail.com',
  },
  {
    id: 4,
    name: 'Olivia',
    role: 'CFO',
    email: 'olivia.d@gmail.com',
  },
];
