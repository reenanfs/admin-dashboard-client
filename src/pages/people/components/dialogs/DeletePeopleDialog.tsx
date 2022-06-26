import { GridRowId } from '@mui/x-data-grid';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';

import StandardDialog from 'components/dialogs/StandardDialog';
import { DELETE_MULTIPLE_DIALOG_CONTENT } from 'pages/people/peopleConstants';
import { DELETE_MULTIPLE_DIALOG_TITLE } from 'pages/people/peopleConstants';
import { DELETE_USERS } from 'pages/people/peopleQueries';
import { IPerson } from 'types/peopleTypes';
import { GET_USERS } from 'graphql/peopleQueries';

interface IDeletePeopleDialogProps {
  open: boolean;
  ids: GridRowId[];
  handleClose: () => void;
  handleConfirm?: () => void;
}

const DeletePeopleDialog = ({
  open,
  ids,
  handleClose,
}: IDeletePeopleDialogProps): JSX.Element => {
  const [deleteUsers, { loading, error }] = useMutation<
    { deleteUsers: IPerson[] },
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
      title={DELETE_MULTIPLE_DIALOG_TITLE}
      content={<span>{DELETE_MULTIPLE_DIALOG_CONTENT}</span>}
      confirmButtonLoading={loading}
      handleClose={handleClose}
      handleConfirm={onSubmit}
    />
  );
};

export default DeletePeopleDialog;
