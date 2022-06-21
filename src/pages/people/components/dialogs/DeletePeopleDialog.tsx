import { GridRowId } from '@mui/x-data-grid';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';

import StandardDialog from 'components/dialogs/StandardDialog';
import { MDELETE_DIALOG_CONTENT } from 'pages/people/peopleConstants';
import { DELETE_USERS, GET_USERS } from 'pages/people/peopleQueries';
import { Person } from 'pages/people/peopleTypes';

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
    { deleteUsers: Person[] },
    { input: { ids: GridRowId[] } }
  >(DELETE_USERS, {
    refetchQueries: [GET_USERS, 'GetUsers'],
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
      content={<span>{MDELETE_DIALOG_CONTENT}</span>}
      confirmButtonLoading={loading}
      handleClose={handleClose}
      handleConfirm={onSubmit}
    />
  );
};

export default DeletePeopleDialog;
