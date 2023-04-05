import { useState, ReactNode, createContext } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { routesPaths } from 'constants/routesConstants';

import {
  ICredential,
  ICurrentUser,
  ILocalLocalSignoutInput,
} from 'types/authTypes';
import { useCurrentUser } from 'hooks/useCurrentUser';
import { useMutation } from '@apollo/client';
import { LOCAL_SIGNOUT } from 'graphql/queries/authQueries';

interface IAuthProviderProps {
  children: ReactNode;
}

export interface AuthContextProps {
  accessToken: string | null;
  refreshToken: string | null;
  whoAmIFetched: boolean;
  setwhoAmIFetched: (dataFetched: boolean) => void;
  handleLogin: (
    newAccessToken: string,
    newRefreshToken: string,
    credential: ICredential,
    navigate: NavigateFunction
  ) => void;
  handleLogout: (credentialId: string, navigate: NavigateFunction) => void;
  isAuthenticated: () => boolean;
  setAuth: (
    accessToken: string,
    refreshToken: string,
    credential: ICredential
  ) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  accessToken: null,
  refreshToken: null,
  whoAmIFetched: false,
  setwhoAmIFetched: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
  isAuthenticated: () => false,
  setAuth: () => {},
});

export const AuthProvider = ({ children }: IAuthProviderProps): JSX.Element => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [whoAmIFetched, setwhoAmIFetched] = useState<boolean>(false);

  const { setUser } = useCurrentUser();

  const credentialToUser = (credential: ICredential): ICurrentUser => {
    const user = credential.user;
    const currentUser = {
      ...user,
      email: credential.email,
      credentialId: credential.id,
    };

    return currentUser;
  };

  const setAuth = (
    accessToken: string,
    refreshToken: string,
    credential: ICredential
  ): void => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);

    setUser(credentialToUser(credential));
  };

  const handleLogin = (
    newAccessToken: string,
    newRefreshToken: string,
    credential: ICredential,
    navigate: NavigateFunction
  ) => {
    setAuth(newAccessToken, newRefreshToken, credential);

    navigate(routesPaths.HOME);
  };

  // logic related to signing out a user
  const [localSignout] = useMutation<
    { localSignout: ILocalLocalSignoutInput },
    { input: ILocalLocalSignoutInput }
  >(LOCAL_SIGNOUT);

  const handleLogout = async (
    credentialId: string,
    navigate: NavigateFunction
  ) => {
    await localSignout({
      variables: {
        input: {
          id: credentialId,
        },
      },
    });

    setAccessToken(null);
    setRefreshToken(null);

    navigate(routesPaths.LOGIN);
  };

  const isAuthenticated = (): boolean => {
    return !!accessToken;
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        whoAmIFetched,
        setwhoAmIFetched,
        isAuthenticated,
        handleLogin,
        handleLogout,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
