import { ApolloQueryResult, DocumentNode, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';

import StandardDialog from 'components/dialogs/StandardDialog';
import {
  ValidAppEntitiesCreationFields,
  ValidAppEntitiesData,
} from 'types/appTypes';
import { useDialogs } from 'hooks/useDialogs';
import { ADD_FORM_ID } from 'constants/componentConstants';

interface IFormProps<T> {
  onSubmit: SubmitHandler<T>;
}

interface IAddITemDialogProps<T, S> {
  title: string;
  Form: React.FC<IFormProps<T>>;
  mutation: DocumentNode;
  refetchFunction: () => Promise<ApolloQueryResult<S>>;
}

const AddPersonDialog = <
  T extends ValidAppEntitiesCreationFields,
  S extends ValidAppEntitiesData
>({
  title,
  Form,
  mutation,
  refetchFunction,
}: IAddITemDialogProps<T, S>): JSX.Element => {
  const {
    addItemDialog: { isOpen, handleClose },
  } = useDialogs();

  const [createItem, { loading, error }] = useMutation<
    { createItem: T },
    { input: ValidAppEntitiesCreationFields }
  >(mutation);

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

export default AddPersonDialog;
