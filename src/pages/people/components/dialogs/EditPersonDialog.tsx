import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import StandardDialog from 'components/dialogs/StandardDialog';
import EditPersonForm from 'pages/people/components/forms/EditPersonForm';
import { PEOPLE_FORM_ID } from 'pages/people/peopleConstants';
import { UPDATE_USER, GET_USERS } from 'pages/people/peopleQueries';
import { Person } from 'pages/people/peopleTypes';

interface IEditPersonDialogProps {
  open: boolean;
  title: string;
  defaultValues: Person;
  handleClose: () => void;
  handleConfirm?: () => void;
}

const EditPersonDialog = ({
  open,
  title,
  defaultValues,
  handleClose,
}: IEditPersonDialogProps): JSX.Element => {
  const [updateUser, { loading, error }] = useMutation<
    { updateUser: Person },
    { input: Person }
  >(UPDATE_USER, {
    refetchQueries: [GET_USERS, 'GetUsers'],
  });

  const onSubmit: SubmitHandler<Person> = async ({
    id,
    name,
    role,
    email,
  }): Promise<void> => {
    await updateUser({
      variables: {
        input: {
          id,
          name,
          role,
          email,
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
      content={
        <EditPersonForm onSubmit={onSubmit} defaultValues={defaultValues} />
      }
      contentFormId={PEOPLE_FORM_ID}
      confirmButtonLoading={loading}
      handleClose={handleClose}
    />
  );
};

export default EditPersonDialog;
