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
import {
  ValidAppEntities,
  ValidAppEntitiesCreationFields,
} from 'types/appTypes';
import AddItemDialog from 'components/dialogs/AddItemDialog';

interface IBaseFormProps<T> {
  onSubmit: SubmitHandler<T>;
}

interface IEditFormProps<T> extends IBaseFormProps<T> {
  defaultValues: T;
}

interface IDialogProps {
  title: string;
  content: string;
  mutation: DocumentNode;
}

interface IAddDialogProps<T> extends IDialogProps {
  AddItemForm: React.FC<IBaseFormProps<T>>;
}

interface IEditDialogProps<T> extends IDialogProps {
  EditItemForm: React.FC<IEditFormProps<T>>;
}

interface IDialogRefetchProps {
  refetchQuery: DocumentNode;
  refetchQueryName: string;
}

interface ICustomDatagridProps<T, S, U> {
  columns: GridColDef[];
  rows: U[];
  label: string;
  loading: boolean;
  deleteMultipleItemsDialogProps: IDialogProps;
  deleteItemDialogProps: IDialogProps;
  editItemDialogProps: Omit<IEditDialogProps<T>, 'content'>;
  addItemDialogProps: Omit<IAddDialogProps<S>, 'content'>;
  dialogRefetchProps: IDialogRefetchProps;
}

const CustomDatagrid = <
  T extends ValidAppEntities,
  S extends ValidAppEntitiesCreationFields,
  U = void
>({
  columns,
  rows,
  label,
  loading,
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
    mutation: editItemMutation,
    EditItemForm,
  },
  addItemDialogProps: {
    title: addItemDialogTitle,
    mutation: addItemMutation,
    AddItemForm,
  },
  dialogRefetchProps: { refetchQuery, refetchQueryName },
}: ICustomDatagridProps<T, S, U>): JSX.Element => {
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
      <AddItemDialog
        title={addItemDialogTitle}
        Form={AddItemForm}
        mutation={addItemMutation}
        refetchQuery={refetchQuery}
        refetchQueryName={refetchQueryName}
      />
    </Box>
  );
};

export default CustomDatagrid;
