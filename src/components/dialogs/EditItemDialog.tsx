import { ApolloQueryResult, DocumentNode, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import StandardDialog from 'components/dialogs/StandardDialog';
import { EDIT_FORM_ID } from 'constants/componentConstants';
import { useDialogs } from 'hooks/useDialogs';

import { FieldValues } from 'react-hook-form';
import {
  ValidDataGridEntitiesUpdateInput,
  ValidDataGridRefetchData,
  ValidDataGridRows,
} from 'types/dataGridTypes';

interface IFormProps<T extends FieldValues, U> {
  onSubmit: SubmitHandler<T>;
  defaultValues: U;
}

interface IEditItemDialogProps<T extends FieldValues, S, U> {
  title: string;
  Form: React.FC<IFormProps<T, U>>;
  mutation: DocumentNode;
  refetchFunction: () => Promise<ApolloQueryResult<S>>;
}

const EditItemDialog = <
  T extends ValidDataGridEntitiesUpdateInput,
  S extends ValidDataGridRefetchData,
  U extends ValidDataGridRows
>({
  title,
  Form,
  mutation,
  refetchFunction,
}: IEditItemDialogProps<T, S, U>): JSX.Element => {
  const {
    editItemDialog: { defaultValues, isOpen, handleClose },
  } = useDialogs();

  const values = defaultValues as U;

  const [updateItem, { loading, error }] = useMutation<
    { updateItem: T },
    { input: ValidDataGridEntitiesUpdateInput }
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
