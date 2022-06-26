import { GridRowId } from '@mui/x-data-grid';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';

import StandardDialog from 'components/dialogs/StandardDialog';
import { DELETE_MULTIPLE_DIALOG_CONTENT } from 'pages/home/homeConstants';
import { DELETE_TASKS, GET_TASKS } from 'pages/home/homeQueries';
import { ITask } from 'pages/home/homeTypes';

interface IDeletePeopleDialogProps {
  open: boolean;
  title: string;
  ids: GridRowId[];
  handleClose: () => void;
  handleConfirm?: () => void;
}

const DeletePeopleDialog = ({
  open,
  title,
  ids,
  handleClose,
}: IDeletePeopleDialogProps): JSX.Element => {
  const [deleteUsers, { loading, error }] = useMutation<
    { deleteUsers: ITask[] },
    { input: { ids: GridRowId[] } }
  >(DELETE_TASKS, {
    refetchQueries: [GET_TASKS, 'GetUsers'],
  });

  const onSubmit = async (): Promise<void> => {
    await deleteUsers({
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
      open={open}
      title={title}
      content={<span>{DELETE_MULTIPLE_DIALOG_CONTENT}</span>}
      confirmButtonLoading={loading}
      handleClose={handleClose}
      handleConfirm={onSubmit}
    />
  );
};

export default DeletePeopleDialog;
