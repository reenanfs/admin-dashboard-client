import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import StandardDialog from 'components/dialogs/StandardDialog';
import AddPersonForm from 'pages/people/components/forms/AddPersonForm';
import { ADD_FORM_ID } from 'pages/people/peopleConstants';
import { CREATE_USER, GET_USERS } from 'pages/people/peopleQueries';
import { IAddPersonFields, Person } from 'pages/people/peopleTypes';

interface IAddPersonDialogProps {
  open: boolean;
  title: string;
  handleClose: () => void;
  handleConfirm?: () => void;
}

const AddPersonDialog = ({
  open,
  title,
  handleClose,
}: IAddPersonDialogProps): JSX.Element => {
  const [createUser, { loading, error }] = useMutation<
    { createUser: Person },
    { input: IAddPersonFields }
  >(CREATE_USER, {
    refetchQueries: [GET_USERS, 'GetUsers'],
  });

  const onSubmit: SubmitHandler<IAddPersonFields> = ({
    name,
    role,
    email,
  }): void => {
    createUser({
      variables: {
        input: {
          name,
          role,
          email,
        },
      },
    });
  };

  useEffect(() => {
    if (!loading) {
      handleClose();
    }
  }, [loading, handleClose]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return (
    <StandardDialog
      open={open}
      title={title}
      content={<AddPersonForm onSubmit={onSubmit} />}
      contentFormId={ADD_FORM_ID}
      confirmButtonLoading={loading}
      handleClose={handleClose}
    />
  );
};

export default AddPersonDialog;
