import { GridColDef } from '@mui/x-data-grid';

export const label = 'Manage Tasks';

export interface HomeGridRowDef {
  id: number | string;
  taskName: string;
  description: string;
  startDate: string;
  person: string;
  endDate: string;
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
    field: 'endDate',
    headerName: 'End Date',
    flex: 1,
    editable: true,
  },
];

export const rows: HomeGridRowDef[] = [
  {
    id: 1,
    taskName: 'Task 1',
    description: 'A simple task',
    startDate: '15/12/2014',
    person: 'Renan',
    endDate: '15/12/2024',
  },
  {
    id: 2,
    taskName: 'Task 2',
    description: 'A simple task',
    startDate: '15/12/2014',
    person: 'Renan',
    endDate: '15/12/2024',
  },
  {
    id: 3,
    taskName: 'Task 3',
    description: 'A simple task',
    startDate: '15/12/2014',
    person: 'Renan',
    endDate: '15/12/2024',
  },
  {
    id: 4,
    taskName: 'Task 4',
    description: 'A simple task',
    startDate: '15/12/2014',
    person: 'Renan',
    endDate: '15/12/2024',
  },
  {
    id: 5,
    taskName: 'Task 5',
    description: 'A simple task',
    startDate: '15/12/2014',
    person: 'Renan',
    endDate: '15/12/2024',
  },
  {
    id: 6,
    taskName: 'Task 6',
    description: 'A simple task',
    startDate: '15/12/2014',
    person: 'Renan',
    endDate: '15/12/2024',
  },
  {
    id: 7,
    taskName: 'Task 7',
    description: 'A simple task',
    startDate: '15/12/2014',
    person: 'Renan',
    endDate: '15/12/2024',
  },
  {
    id: 8,
    taskName: 'Task 8',
    description: 'A simple task',
    startDate: '15/12/2014',
    person: 'Renan',
    endDate: '15/12/2024',
  },
  {
    id: 9,
    taskName: 'Task 9',
    description: 'A simple task',
    startDate: '15/12/2014',
    person: 'Renan',
    endDate: '15/12/2024',
  },
  {
    id: 10,
    taskName: 'Task 10',
    description: 'A simple task',
    startDate: '15/12/2014',
    person: 'Renan',
    endDate: '15/12/2024',
  },
  {
    id: 11,
    taskName: 'Task 11',
    description: 'A simple task',
    startDate: '15/12/2014',
    person: 'Renan',
    endDate: '15/12/2024',
  },
];
