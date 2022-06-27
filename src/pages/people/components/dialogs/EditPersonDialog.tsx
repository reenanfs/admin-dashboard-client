import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import StandardDialog from 'components/dialogs/StandardDialog';
import EditPersonForm from 'pages/people/components/forms/EditPersonForm';
import { PEOPLE_FORM_ID } from 'pages/people/peopleConstants';
import { UPDATE_USER } from 'pages/people/peopleQueries';
import { IPerson } from 'types/peopleTypes';
import { GET_USERS } from 'graphql/peopleQueries';

interface IEditPersonDialogProps {
  open: boolean;
  title: string;
  defaultValues: IPerson;
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
    { updateUser: IPerson },
    { input: IPerson }
  >(UPDATE_USER, {
    refetchQueries: [GET_USERS, 'GetUsers'],
  });

  const onSubmit: SubmitHandler<IPerson> = async (props): Promise<void> => {
    await updateUser({
      variables: {
        input: {
          ...props,
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
