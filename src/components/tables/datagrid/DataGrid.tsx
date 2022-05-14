import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';

import GridToolbar from './grid-toolbar/GridToolbar';

import { localizedTextsMap } from './dataGridConfigutation';

interface ICustomDatagridProps<T> {
  columns: GridColDef[];
  rows: T[];
  label: string;
  loading: boolean;
}

const CustomDatagrid = <T extends unknown>(props: ICustomDatagridProps<T>) => {
  const [pageSize, setPageSize] = useState(10);

  const { columns, rows, label, loading } = props;
  return (
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid
        loading={loading}
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        localeText={localizedTextsMap}
        components={{
          Toolbar: GridToolbar,
        }}
        componentsProps={{
          toolbar: { label },
        }}
      />
    </div>
  );
};

export default CustomDatagrid;
