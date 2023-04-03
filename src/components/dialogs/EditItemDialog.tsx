import { ApolloQueryResult, DocumentNode, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import StandardDialog from 'components/dialogs/StandardDialog';
import { EDIT_FORM_ID } from 'constants/componentConstants';
import { useDialogs } from 'hooks/useDialogs';
import { ValidAppEntities, ValidAppEntitiesData } from 'types/appTypes';
import { FieldValues } from 'react-hook-form';

interface IFormProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  defaultValues: T;
}

interface IEditItemDialogProps<T extends FieldValues, S> {
  title: string;
  Form: React.FC<IFormProps<T>>;
  mutation: DocumentNode;
  refetchFunction: () => Promise<ApolloQueryResult<S>>;
}

const EditItemDialog = <
  T extends ValidAppEntities,
  S extends ValidAppEntitiesData
>({
  title,
  Form,
  mutation,
  refetchFunction,
}: IEditItemDialogProps<T, S>): JSX.Element => {
  const {
    editItemDialog: { defaultValues, isOpen, handleClose },
  } = useDialogs();

  const values = defaultValues as T;

  const [updateItem, { loading, error }] = useMutation<
    { updateItem: T },
    { input: ValidAppEntities }
  >(mutation);

  const onSubmit: SubmitHandler<T> = async (props): Promise<void> => {
    await updateItem({
      variables: {
        input: {
          ...props,
        },
      },
    });
    refetchFunction();
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
