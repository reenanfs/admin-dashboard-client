import { GridRowId } from '@mui/x-data-grid';
import { DocumentNode, useMutation } from '@apollo/client';
import { useEffect } from 'react';

import StandardDialog from 'components/dialogs/StandardDialog';
import { useDialogs } from 'hooks/useDialogs';

interface IDeletePersonDialogProps {
  title: string;
  content: string;
  mutation: DocumentNode;
  refetchQuery: DocumentNode;
  refetchQueryName: string;
}

const DeleteItemDialog = <T extends unknown>({
  title,
  content,
  mutation,
  refetchQuery,
  refetchQueryName,
}: IDeletePersonDialogProps): JSX.Element => {
  const {
    deleteItemDialog: { id, isOpen, handleClose },
  } = useDialogs();

  const [deleteItem, { loading, error }] = useMutation<
    { deleteItem: T },
    { input: { id: GridRowId } }
  >(mutation, {
    refetchQueries: [refetchQuery, refetchQueryName],
  });

  const onSubmit = async (): Promise<void> => {
    await deleteItem({
      variables: {
        input: {
          id,
        },
      },
    });
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
