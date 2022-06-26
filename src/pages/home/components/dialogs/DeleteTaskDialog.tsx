import { GridRowId } from '@mui/x-data-grid';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';

import StandardDialog from 'components/dialogs/StandardDialog';
import { DELETE_DIALOG_CONTENT } from 'pages/home/homeConstants';
import { DELETE_TASK, GET_TASKS } from 'pages/home/homeQueries';
import { ITask } from 'pages/home/homeTypes';

interface IDeleteTaskDialogProps {
  open: boolean;
  title: string;
  id: GridRowId;
  handleClose: () => void;
  handleConfirm?: () => void;
}

const DeleteTaskDialog = ({
  open,
  title,
  id,
  handleClose,
}: IDeleteTaskDialogProps): JSX.Element => {
  const [deleteTask, { loading, error }] = useMutation<
    { deleteTask: ITask },
    { input: { id: GridRowId } }
  >(DELETE_TASK, {
    refetchQueries: [GET_TASKS, 'GetTasks'],
  });

  const onSubmit = async (): Promise<void> => {
    await deleteTask({
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
      open={open}
      title={title}
      content={<span>{DELETE_DIALOG_CONTENT}</span>}
      confirmButtonLoading={loading}
      handleClose={handleClose}
      handleConfirm={onSubmit}
    />
  );
};

export default DeleteTaskDialog;
