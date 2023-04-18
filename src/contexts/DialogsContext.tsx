import { GridRowId } from '@mui/x-data-grid';
import { createContext, ReactNode, useState } from 'react';
import { ValidDataGridEntitiesUpdateInput } from 'types/dataGridTypes';

interface IDialogsProviderProps {
  children: ReactNode;
}

interface IDialogParams {
  isOpen: boolean;
  handleClose: () => void;
  handleOpen: () => void;
}

interface IDeleteItemDialogParams extends IDialogParams {
  id: GridRowId;
  setId: (newValue: GridRowId) => void;
}

interface IEditItemDialogParams<T extends ValidDataGridEntitiesUpdateInput>
  extends IDialogParams {
  defaultValues?: T;
  setDefaultValues: (newValue: T) => void;
}

export interface IDialogsContextProps<
  T extends ValidDataGridEntitiesUpdateInput
> {
  deleteMultipleItemsDialog: IDialogParams;
  addItemDialog: IDialogParams;
  deleteItemDialog: IDeleteItemDialogParams;
  editItemDialog: IEditItemDialogParams<T>;
}

const initialValues: IDialogsContextProps<ValidDataGridEntitiesUpdateInput> = {
  deleteMultipleItemsDialog: {
    isOpen: false,
    handleOpen: () => {},
    handleClose: () => {},
  },
  addItemDialog: {
    isOpen: false,
    handleOpen: () => {},
    handleClose: () => {},
  },
  deleteItemDialog: {
    isOpen: false,
    handleOpen: () => {},
    handleClose: () => {},
    id: '',
    setId: () => {},
  },
  editItemDialog: {
    isOpen: false,
    handleOpen: () => {},
    handleClose: () => {},
    setDefaultValues: () => {},
  },
};

export const DialogsContext =
  createContext<IDialogsContextProps<ValidDataGridEntitiesUpdateInput>>(
    initialValues
  );

export const DialogsProvider = ({
  children,
}: IDialogsProviderProps): JSX.Element => {
  const [isDeleteMultipleItemsOpen, setIsDeleteMultipleItemsOpen] = useState(
    initialValues.deleteMultipleItemsDialog.isOpen
  );

  const [isAddItemOpen, setIsAddItemOpen] = useState(
    initialValues.addItemDialog.isOpen
  );

  const [isDeleteItemsOpen, setIsDeleteItemOpen] = useState(
    initialValues.deleteItemDialog.isOpen
  );

  const [isEditItemOpen, setIsEditItemOpen] = useState(
    initialValues.editItemDialog.isOpen
  );

  const [id, setId] = useState(initialValues.deleteItemDialog.id);

  const [defaultValues, setDefaultValues] =
    useState<ValidDataGridEntitiesUpdateInput>();

  const handleDeleteMultipleItemsOpen = () => {
    setIsDeleteMultipleItemsOpen(true);
  };

  const handleDeleteMultipleItemsClose = () => {
    setIsDeleteMultipleItemsOpen(false);
  };

  const handleAddItemOpen = () => {
    setIsAddItemOpen(true);
  };

  const handleAddItemClose = () => {
    setIsAddItemOpen(false);
  };

  const handleDeleteItemOpen = () => {
    setIsDeleteItemOpen(true);
  };

  const handleDeleteItemClose = () => {
    setIsDeleteItemOpen(false);
  };

  const handleEditItemOpen = () => {
    setIsEditItemOpen(true);
  };

  const handleEditItemClose = () => {
    setIsEditItemOpen(false);
  };

  return (
    <DialogsContext.Provider
      value={{
        deleteMultipleItemsDialog: {
          isOpen: isDeleteMultipleItemsOpen,
          handleOpen: handleDeleteMultipleItemsOpen,
          handleClose: handleDeleteMultipleItemsClose,
        },
        addItemDialog: {
          isOpen: isAddItemOpen,
          handleOpen: handleAddItemOpen,
          handleClose: handleAddItemClose,
        },
        deleteItemDialog: {
          isOpen: isDeleteItemsOpen,
          handleOpen: handleDeleteItemOpen,
          handleClose: handleDeleteItemClose,
          id,
          setId,
        },
        editItemDialog: {
          isOpen: isEditItemOpen,
          handleOpen: handleEditItemOpen,
          handleClose: handleEditItemClose,
          defaultValues,
          setDefaultValues,
        },
      }}
    >
      {children}
    </DialogsContext.Provider>
  );
};
