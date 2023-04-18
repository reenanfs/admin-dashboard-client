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
import { ApolloQueryResult, DocumentNode } from '@apollo/client';
import EditItemDialog from 'components/dialogs/EditItemDialog';
import { SubmitHandler, FieldValues } from 'react-hook-form';
import AddItemDialog from 'components/dialogs/AddItemDialog';
import {
  ValidDataGridEntitiesUpdateInput,
  ValidDataGridEntitiesCreationInput,
  ValidDataGridRefetchData,
  ValidDataGridRows,
} from 'types/dataGridTypes';

interface IDialogProps {
  title: string;
  content: string;
  mutation: DocumentNode;
}

interface IBaseFormProps<S extends FieldValues> {
  onSubmit: SubmitHandler<S>;
}

interface IAddDialogProps<S extends FieldValues> extends IDialogProps {
  AddItemForm: React.FC<IBaseFormProps<S>>;
}

interface IEditDialogProps<T extends FieldValues, U> extends IDialogProps {
  EditItemForm: React.FC<IEditFormProps<T, U>>;
}

interface IEditFormProps<T extends FieldValues, U> extends IBaseFormProps<T> {
  defaultValues: U;
}

interface ICustomDatagridProps<
  T extends FieldValues,
  S extends FieldValues,
  U,
  V
> {
  columns: GridColDef[];
  rows: U[];
  label: string;
  loading: boolean;
  deleteMultipleItemsDialogProps: IDialogProps;
  deleteItemDialogProps: IDialogProps;
  editItemDialogProps: Omit<IEditDialogProps<T, U>, 'content'>;
  addItemDialogProps: Omit<IAddDialogProps<S>, 'content'>;
  refetchFunction: () => Promise<ApolloQueryResult<V>>;
}

const CustomDatagrid = <
  T extends ValidDataGridEntitiesUpdateInput,
  S extends ValidDataGridEntitiesCreationInput,
  U extends ValidDataGridRows,
  V extends ValidDataGridRefetchData
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
  refetchFunction,
}: ICustomDatagridProps<T, S, U, V>): JSX.Element => {
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
      <DeleteMultipleItemsDialog<T, V>
        ids={gridRowIds}
        title={deleteMultipleItemsDialogTitle}
        content={deleteMultipleItemsDialogContent}
        mutation={deleteMultipleItemsMutation}
        refetchFunction={refetchFunction}
      />
      <DeleteItemDialog
        title={deleteItemDialogTitle}
        content={deleteItemDialogContent}
        mutation={deleteItemMutation}
        refetchFunction={refetchFunction}
      />
      <EditItemDialog
        title={editItemDialogTitle}
        Form={EditItemForm}
        mutation={editItemMutation}
        refetchFunction={refetchFunction}
      />
      <AddItemDialog<S, V>
        title={addItemDialogTitle}
        Form={AddItemForm}
        mutation={addItemMutation}
        refetchFunction={refetchFunction}
      />
    </Box>
  );
};

export default CustomDatagrid;
