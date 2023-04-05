import { AuthContext } from 'contexts/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const authStore = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (newAccessToken: string, newRefreshToken: string) => {
    authStore.handleLogin(newAccessToken, newRefreshToken, navigate);
  };

  const handleLogout = () => {
    authStore.handleLogout(navigate);
  };

  return {
    ...authStore,
    handleLogin,
    handleLogout,
  };
};
