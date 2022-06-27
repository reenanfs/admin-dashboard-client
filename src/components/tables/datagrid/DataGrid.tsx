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
import DeleteMultipleItemsDialog from 'components/dialogs/DeleteMultipleItemsDialog';
import DeleteItemDialog from 'components/dialogs/DeleteItemDialog';
import { DocumentNode } from '@apollo/client';
import EditItemDialog from 'components/dialogs/EditItemDialog';
import { SubmitHandler } from 'react-hook-form';
import { ValidAppEntities } from 'types/appTypes';

interface FormProps<T> {
  onSubmit: SubmitHandler<T>;
  defaultValues: T;
}

interface IDialogProps<T> {
  mutation: DocumentNode;
  title: string;
  content: string;
  Form: React.FC<FormProps<T>>;
}

interface IDialogRefetchProps {
  refetchQuery: DocumentNode;
  refetchQueryName: string;
}

interface ICustomDatagridProps<T, S> {
  columns: GridColDef[];
  rows: S[];
  label: string;
  loading: boolean;
  toolbarComponent?: React.ReactNode;
  deleteMultipleItemsDialogProps: Omit<IDialogProps<T>, 'Form'>;
  deleteItemDialogProps: Omit<IDialogProps<T>, 'Form'>;
  editItemDialogProps: Omit<IDialogProps<T>, 'content'>;
  dialogRefetchProps: IDialogRefetchProps;
}

const CustomDatagrid = <T extends ValidAppEntities, S = void>({
  columns,
  rows,
  label,
  loading,
  toolbarComponent,
  deleteMultipleItemsDialogProps: {
    title: deleteMultipleItemsDialogTitle,
    content: deleteMultipleItemsDialogContent,
    mutation: deleteMultipleItemsMutation,
  },
  deleteItemDialogProps: {
    title: deleteItemDialogTitle,
    content: deleteItemDialogContent,
    mutation: deleteItemMutation,
  },
  editItemDialogProps: {
    title: editItemDialogTitle,
    Form: EditItemForm,
    mutation: editItemMutation,
  },
  dialogRefetchProps: { refetchQuery, refetchQueryName },
}: ICustomDatagridProps<T, S>): JSX.Element => {
  const [pageSize, setPageSize] = useState(10);
  const [gridRowIds, setGridRowIds] = useState<GridRowId[]>([]);
  const [buttonDeleteMultipleVisible, setButtonDeleteMultipleVisible] =
    useState(false);

  const showActionButtons = (rowModesModel: GridSelectionModel) => {
    if (rowModesModel.length !== 0) {
      setButtonDeleteMultipleVisible(true);
      setGridRowIds(rowModesModel);
    } else {
      setButtonDeleteMultipleVisible(false);
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
            buttonDeleteMultipleVisible,
          },
          pagination: { pageSize, setPageSize },
        }}
      />
      <DeleteMultipleItemsDialog<T>
        ids={gridRowIds}
        title={deleteMultipleItemsDialogTitle}
        content={deleteMultipleItemsDialogContent}
        mutation={deleteMultipleItemsMutation}
        refetchQuery={refetchQuery}
        refetchQueryName={refetchQueryName}
      />
      <DeleteItemDialog
        title={deleteItemDialogTitle}
        content={deleteItemDialogContent}
        mutation={deleteItemMutation}
        refetchQuery={refetchQuery}
        refetchQueryName={refetchQueryName}
      />
      <EditItemDialog
        title={editItemDialogTitle}
        Form={EditItemForm}
        mutation={editItemMutation}
        refetchQuery={refetchQuery}
        refetchQueryName={refetchQueryName}
      />
    </Box>
  );
};

export default CustomDatagrid;
