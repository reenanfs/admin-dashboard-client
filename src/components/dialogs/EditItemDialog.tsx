import { DocumentNode, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import StandardDialog from 'components/dialogs/StandardDialog';
import { EDIT_FORM_ID } from 'constants/componentConstants';
import { useDialogs } from 'hooks/useDialogs';
import { ValidAppEntities } from 'types/appTypes';

interface FormProps<T> {
  onSubmit: SubmitHandler<T>;
  defaultValues: T;
}

interface IEditItemDialogProps<T> {
  title: string;
  Form: React.FC<FormProps<T>>;
  mutation: DocumentNode;
  refetchQuery: DocumentNode;
  refetchQueryName: string;
}

const EditItemDialog = <T extends ValidAppEntities>({
  title,
  Form,
  mutation,
  refetchQuery,
  refetchQueryName,
}: IEditItemDialogProps<T>): JSX.Element => {
  const {
    editItemDialog: { defaultValues, isOpen, handleClose },
  } = useDialogs();

  const values = defaultValues as T;

  const [updateItem, { loading, error }] = useMutation<
    { updateItem: T },
    { input: ValidAppEntities }
  >(mutation, {
    refetchQueries: [refetchQuery, refetchQueryName],
  });

  const onSubmit: SubmitHandler<T> = async (props): Promise<void> => {
    await updateItem({
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
      content={<Form onSubmit={onSubmit} defaultValues={values} />}
      contentFormId={EDIT_FORM_ID}
      confirmButtonLoading={loading}
      handleClose={handleClose}
    />
  );
};

export default EditItemDialog;
