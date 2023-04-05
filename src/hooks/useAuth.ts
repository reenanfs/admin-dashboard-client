import { AuthContext } from 'contexts/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICredential } from 'types/authTypes';

export const useAuth = () => {
  const authStore = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (
    newAccessToken: string,
    newRefreshToken: string,
    credential: ICredential
  ) => {
    authStore.handleLogin(
      newAccessToken,
      newRefreshToken,
      credential,
      navigate
    );
  };

  const handleLogout = (credentialId: string) => {
    authStore.handleLogout(credentialId, navigate);
  };

  return {
    ...authStore,
    handleLogin,
    handleLogout,
  };
};
