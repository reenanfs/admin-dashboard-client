import { GridRowId } from '@mui/x-data-grid';
import { ApolloQueryResult, DocumentNode, useMutation } from '@apollo/client';
import { useEffect } from 'react';

import StandardDialog from 'components/dialogs/StandardDialog';
import { useDialogs } from 'hooks/useDialogs';
import { ValidAppEntities, ValidAppEntitiesData } from 'types/appTypes';

interface IDeletePersonDialogProps<S> {
  title: string;
  content: string;
  mutation: DocumentNode;
  refetchFunction: () => Promise<ApolloQueryResult<S>>;
}

const DeleteItemDialog = <
  T extends ValidAppEntities,
  S extends ValidAppEntitiesData
>({
  title,
  content,
  mutation,
  refetchFunction,
}: IDeletePersonDialogProps<S>): JSX.Element => {
  const {
    deleteItemDialog: { id, isOpen, handleClose },
  } = useDialogs();

  const [deleteItem, { loading, error }] = useMutation<
    { deleteItem: T },
    { input: { id: GridRowId } }
  >(mutation);

  const onSubmit = async (): Promise<void> => {
    await deleteItem({
      variables: {
        input: {
          id,
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

export default DeleteItemDialog;
