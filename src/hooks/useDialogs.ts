import { useContext } from 'react';
import { DialogsContext } from 'contexts/DialogsContext';

export const useDialogs = () => {
  const dialogsStore = useContext(DialogsContext);

  return dialogsStore;
};
