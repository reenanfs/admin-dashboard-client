import { ApolloQueryResult, DocumentNode, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import StandardDialog from 'components/dialogs/StandardDialog';

import { useDialogs } from 'hooks/useDialogs';
import { ADD_FORM_ID } from 'constants/componentConstants';
import { FieldValues } from 'react-hook-form';
import { useCurrentUser } from 'hooks/useCurrentUser';
import {
  ValidDataGridEntitiesCreationInput,
  ValidDataGridRefetchData,
} from 'types/dataGridTypes';

interface IFormProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
}

interface IAddITemDialogProps<T extends FieldValues, S> {
  title: string;
  Form: React.FC<IFormProps<T>>;
  mutation: DocumentNode;
  refetchFunction: () => Promise<ApolloQueryResult<S>>;
}

const AddItemDialog = <
  T extends ValidDataGridEntitiesCreationInput,
  S extends ValidDataGridRefetchData
>({
  title,
  Form,
  mutation,
  refetchFunction,
}: IAddITemDialogProps<T, S>): JSX.Element => {
  const { currentUser } = useCurrentUser();
  const {
    addItemDialog: { isOpen, handleClose },
  } = useDialogs();

  const [createItem, { loading, error }] = useMutation<
    { createItem: T },
    { input: ValidDataGridEntitiesCreationInput }
  >(mutation);

  const onSubmit: SubmitHandler<ValidDataGridEntitiesCreationInput> = async (
    props
  ): Promise<void> => {
    await createItem({
      variables: {
        input: {
          projectId: currentUser?.currentProjectId!,
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
      content={<Form onSubmit={onSubmit} />}
      contentFormId={ADD_FORM_ID}
      confirmButtonLoading={loading}
      handleClose={handleClose}
    />
  );
};

export default AddItemDialog;
