import { GridRowId } from '@mui/x-data-grid';
import { ApolloQueryResult, DocumentNode, useMutation } from '@apollo/client';
import { useEffect } from 'react';

import StandardDialog from 'components/dialogs/StandardDialog';
import { useDialogs } from 'hooks/useDialogs';
import {
  ValidDataGridEntities,
  ValidDataGridRefetchData,
} from 'types/dataGridTypes';

interface IDeleteMultipleItemsDialogProps<S> {
  ids: GridRowId[];
  title: string;
  content: string;
  mutation: DocumentNode;
  refetchFunction: () => Promise<ApolloQueryResult<S>>;
}

const DeleteMultipleItemsDialog = <
  T extends ValidDataGridEntities,
  S extends ValidDataGridRefetchData
>({
  ids,
  title,
  content,
  mutation,
  refetchFunction,
}: IDeleteMultipleItemsDialogProps<S>): JSX.Element => {
  const {
    deleteMultipleItemsDialog: { isOpen, handleClose },
  } = useDialogs();

  const [deleteItems, { loading, error }] = useMutation<
    { deleteItems: T[] },
    { input: { ids: GridRowId[] } }
  >(mutation);

  const onSubmit = async (): Promise<void> => {
    await deleteItems({
      variables: {
        input: {
          ids,
        },
      },
    });
    refetchFunction();
    handleClose();
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return (
    <StandardDialog
      open={isOpen}
      title={title}
      content={<span>{content}</span>}
      confirmButtonLoading={loading}
      handleClose={handleClose}
      handleConfirm={onSubmit}
    />
  );
};

export default DeleteMultipleItemsDialog;
