import { AuthContext } from 'contexts/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const authStore = useContext(AuthContext);
  const navigate = useNavigate();

  const login = (newAccessToken: string, newRefreshToken: string) => {
    authStore.login(newAccessToken, newRefreshToken, navigate);
  };

  const logout = () => {
    authStore.logout(navigate);
  };

  return {
    ...authStore,
    login,
    logout,
  };
};
