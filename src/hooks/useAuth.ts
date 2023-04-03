import { AuthContext } from 'contexts/AuthContext';
import { useContext } from 'react';

export const useAuth = () => {
  const authStore = useContext(AuthContext);

  return authStore;
};
