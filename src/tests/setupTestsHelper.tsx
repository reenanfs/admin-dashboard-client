import { DataGridProps } from '@mui/x-data-grid';

const { DataGrid } = jest.requireActual('@mui/x-data-grid');

export const MockDataGrid = (props: DataGridProps) => {
  return <DataGrid {...props} disableVirtualization />;
};
