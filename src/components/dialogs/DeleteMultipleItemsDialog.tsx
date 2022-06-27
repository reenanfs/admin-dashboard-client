import { GridRowId } from '@mui/x-data-grid';
import { DocumentNode, useMutation } from '@apollo/client';
import { useEffect } from 'react';

import StandardDialog from 'components/dialogs/StandardDialog';
import { useDialogs } from 'hooks/useDialogs';

interface IDeleteMultipleItemsDialogProps {
  ids: GridRowId[];
  title: string;
  content: string;
  mutation: DocumentNode;
  refetchQuery: DocumentNode;
  refetchQueryName: string;
}

const DeleteMultipleItemsDialog = <T extends unknown>({
  ids,
  title,
  content,
  mutation,
  refetchQuery,
  refetchQueryName,
}: IDeleteMultipleItemsDialogProps): JSX.Element => {
  const {
    deleteMultipleItemsDialog: { isOpen, handleClose },
  } = useDialogs();

  const [deleteItems, { loading, error }] = useMutation<
    { deleteItems: T[] },
    { input: { ids: GridRowId[] } }
  >(mutation, {
    refetchQueries: [refetchQuery, refetchQueryName],
  });

  const onSubmit = async (): Promise<void> => {
    await deleteItems({
      variables: {
        input: {
          ids,
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

export default DeleteMultipleItemsDialog;
