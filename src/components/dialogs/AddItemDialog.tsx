import { DocumentNode, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import StandardDialog from 'components/dialogs/StandardDialog';
import { ValidAppEntitiesCreationFields } from 'types/appTypes';
import { useDialogs } from 'hooks/useDialogs';
import { ADD_FORM_ID } from 'constants/componentConstants';

interface FormProps<T> {
  onSubmit: SubmitHandler<T>;
}

interface IAddITemDialogProps<T> {
  title: string;
  Form: React.FC<FormProps<T>>;
  mutation: DocumentNode;
  refetchQuery: DocumentNode;
  refetchQueryName: string;
}

const AddPersonDialog = <T extends ValidAppEntitiesCreationFields>({
  title,
  Form,
  mutation,
  refetchQuery,
  refetchQueryName,
}: IAddITemDialogProps<T>): JSX.Element => {
  const {
    addItemDialog: { isOpen, handleClose },
  } = useDialogs();

  const [createItem, { loading, error }] = useMutation<
    { createItem: T },
    { input: ValidAppEntitiesCreationFields }
  >(mutation, {
    refetchQueries: [refetchQuery, refetchQueryName],
  });

  const onSubmit: SubmitHandler<ValidAppEntitiesCreationFields> = async (
    props
  ): Promise<void> => {
    await createItem({
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
      open={isOpen}
      title={title}
      content={<Form onSubmit={onSubmit} />}
      contentFormId={ADD_FORM_ID}
      confirmButtonLoading={loading}
      handleClose={handleClose}
    />
  );
};

export default AddPersonDialog;
