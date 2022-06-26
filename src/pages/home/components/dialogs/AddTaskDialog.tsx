import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import StandardDialog from 'components/dialogs/StandardDialog';
import AddTaskForm from 'pages/home/components/forms/AddTaskForm';
import { TASKS_FORM_ID } from 'pages/home/homeConstants';
import { CREATE_TASK, GET_TASKS } from 'pages/home/homeQueries';
import { ITaskFields, ITask } from 'pages/home/homeTypes';

interface IAddTaskDialogProps {
  open: boolean;
  title: string;
  handleClose: () => void;
  handleConfirm?: () => void;
}

const AddTaskDialog = ({
  open,
  title,
  handleClose,
}: IAddTaskDialogProps): JSX.Element => {
  const [createTask, { loading, error }] = useMutation<
    { createTask: ITask },
    { input: ITaskFields }
  >(CREATE_TASK, {
    refetchQueries: [GET_TASKS, 'GetTasks'],
  });

  const onSubmit: SubmitHandler<ITaskFields> = async ({
    taskName,
    description,
    userId,
    startDate,
    dueDate,
  }): Promise<void> => {
    await createTask({
      variables: {
        input: {
          taskName,
          description,
          userId,
          startDate,
          dueDate,
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
      content={<AddTaskForm onSubmit={onSubmit} />}
      contentFormId={TASKS_FORM_ID}
      confirmButtonLoading={loading}
      handleClose={handleClose}
    />
  );
};

export default AddTaskDialog;
