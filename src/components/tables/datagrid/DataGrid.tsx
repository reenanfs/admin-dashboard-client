import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridSelectionModel,
} from '@mui/x-data-grid';
import { Box, LinearProgress } from '@mui/material';
import { useState } from 'react';

import GridToolbar from './toolbar/GridToolbar';
import GridPagination from './pagination/GridPagination';

interface IMDeleteDialogProps {
  open: boolean;
  title: string;
  ids: GridRowId[];
  handleClose: () => void;
  handleConfirm?: () => void;
}

interface ICustomDatagridProps<T> {
  columns: GridColDef[];
  rows: T[];
  label: string;
  loading: boolean;
  toolbarComponent?: JSX.Element;
  MDeleteDialog?: React.ElementType<IMDeleteDialogProps>;
}

const CustomDatagrid = <T extends unknown>(
  props: ICustomDatagridProps<T>
): JSX.Element => {
  const [pageSize, setPageSize] = useState(10);
  const [gridRowIds, setGridRowIds] = useState<GridRowId[]>([]);
  const [mDeleteButtonVisible, setMDeleteButtonVisible] = useState(false);
  const { columns, rows, label, loading, toolbarComponent, MDeleteDialog } =
    props;

  const showActionButtons = (rowModesModel: GridSelectionModel) => {
    if (rowModesModel.length !== 0) {
      setMDeleteButtonVisible(true);
      setGridRowIds(rowModesModel);
    } else {
      setMDeleteButtonVisible(false);
      setGridRowIds([]);
    }
  };

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
        onSelectionModelChange={showActionButtons}
        checkboxSelection
        disableColumnMenu
        pagination
        components={{
          Toolbar: GridToolbar,
          Pagination: GridPagination,
          LoadingOverlay: LinearProgress,
        }}
        componentsProps={{
          toolbar: {
            label,
            toolbarComponent,
            mDeleteButtonVisible,
            gridRowIds,
            MDeleteDialog,
            showQuickFilter: true,
          },
          pagination: { pageSize, setPageSize },
        }}
      />
    </Box>
  );
};

export default CustomDatagrid;
