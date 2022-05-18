import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';

import GridToolbar from './grid-toolbar/GridToolbar';

import { localizedTextsMap } from './dataGridConfigutation';

interface ICustomDatagridProps<T> {
  columns: GridColDef[];
  rows: T[];
  label: string;
  loading: boolean;
  toolbarComponent?: JSX.Element;
}

const CustomDatagrid = <T extends unknown>(
  props: ICustomDatagridProps<T>
): JSX.Element => {
  const [pageSize, setPageSize] = useState(10);
  const { columns, rows, label, loading, toolbarComponent } = props;

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
          toolbar: { label, toolbarComponent },
        }}
      />
    </div>
  );
};

export default CustomDatagrid;
