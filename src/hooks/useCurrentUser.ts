import { CurrentUserContext } from 'contexts/CurrentUserContext';
import { useContext } from 'react';

export const useCurrentUser = () => {
  const currentUserStore = useContext(CurrentUserContext);

  return currentUserStore;
};
