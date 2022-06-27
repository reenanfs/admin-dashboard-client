import { GridRowId } from '@mui/x-data-grid';
import { createContext, ReactNode, useState } from 'react';
import { ValidAppEntities } from 'types/appTypes';

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

interface IEditItemDialogParams<T extends ValidAppEntities>
  extends IDialogParams {
  defaultValues?: T;
  setDefaultValues: (newValue: T) => void;
}

export interface IDialogsContextProps<T extends ValidAppEntities> {
  deleteMultipleItemsDialog: IDialogParams;
  deleteItemDialog: IDeleteItemDialogParams;
  editItemDialog: IEditItemDialogParams<T>;
}

const initialValues: IDialogsContextProps<ValidAppEntities> = {
  deleteMultipleItemsDialog: {
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
  createContext<IDialogsContextProps<ValidAppEntities>>(initialValues);

export const DialogsProvider = ({ children }: IDialogsProviderProps) => {
  const [isDeleteMultipleItemsOpen, setDeleteMultipleItems] = useState(
    initialValues.deleteMultipleItemsDialog.isOpen
  );

  const [isDeleteItemsOpen, setDeleteItemOpen] = useState(
    initialValues.deleteItemDialog.isOpen
  );

  const [isEditItemsOpen, setEditItemOpen] = useState(
    initialValues.editItemDialog.isOpen
  );

  const [id, setId] = useState(initialValues.deleteItemDialog.id);

  const [defaultValues, setDefaultValues] = useState<ValidAppEntities>();

  const handleDeleteMultipleItemsOpen = () => {
    setDeleteMultipleItems(true);
  };

  const handleDeleteMultipleItemsClose = () => {
    setDeleteMultipleItems(false);
  };

  const handleDeleteItemOpen = () => {
    setDeleteItemOpen(true);
  };

  const handleDeleteItemClose = () => {
    setDeleteItemOpen(false);
  };

  const handleEditItemOpen = () => {
    setEditItemOpen(true);
  };

  const handleEditItemClose = () => {
    setEditItemOpen(false);
  };

  return (
    <DialogsContext.Provider
      value={{
        deleteMultipleItemsDialog: {
          isOpen: isDeleteMultipleItemsOpen,
          handleOpen: handleDeleteMultipleItemsOpen,
          handleClose: handleDeleteMultipleItemsClose,
        },
        deleteItemDialog: {
          isOpen: isDeleteItemsOpen,
          handleOpen: handleDeleteItemOpen,
          handleClose: handleDeleteItemClose,
          id,
          setId,
        },
        editItemDialog: {
          isOpen: isEditItemsOpen,
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
