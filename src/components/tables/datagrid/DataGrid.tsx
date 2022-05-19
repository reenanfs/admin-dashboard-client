import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, LinearProgress } from '@mui/material';
import React, { useState } from 'react';

import GridToolbar from './toolbar/GridToolbar';
import GridPagination from './pagination/GridPagination';

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
    <Box
      component="div"
      sx={{
        height: '80vh',
        width: '100%',
      }}
    >
      <DataGrid
        loading={loading}
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        hideFooterSelectedRowCount
        checkboxSelection
        pagination
        components={{
          Toolbar: GridToolbar,
          Pagination: GridPagination,
          LoadingOverlay: LinearProgress,
        }}
        componentsProps={{
          toolbar: { label, toolbarComponent },
          pagination: { pageSize, setPageSize },
        }}
      />
    </Box>
  );
};

export default CustomDatagrid;
