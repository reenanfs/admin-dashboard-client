import { useState, useEffect, ReactNode, createContext } from 'react';
import Cookies from 'js-cookie';
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from 'constants/authConstants';
import { NavigateFunction } from 'react-router-dom';
import { routesPaths } from 'constants/routesConstants';
import { GET_TOKENS } from 'graphql/authQueries';
import { useLazyQuery } from '@apollo/client';
import LoadingPage from 'pages/status/loading/Loading';

interface getTokensResponse {
  getTokens: {
    access_token: string;
    refresh_token: string;
  };
}

interface IAuthProviderProps {
  children: ReactNode;
}

export interface AuthContextProps {
  accessToken: string | null;
  refreshToken: string | null;
  handleLogin: (
    newAccessToken: string,
    newRefreshToken: string,
    navigate: NavigateFunction
  ) => void;
  handleLogout: (navigate: NavigateFunction) => void;
  isAuthenticated: () => boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  accessToken: null,
  refreshToken: null,
  handleLogin: () => {},
  handleLogout: () => {},
  isAuthenticated: () => false,
});

export const AuthProvider = ({ children }: IAuthProviderProps): JSX.Element => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // obtain tokens on mount
  const [getTokens] = useLazyQuery<getTokensResponse>(GET_TOKENS, {
    fetchPolicy: 'network-only',
    onCompleted: data => {
      if (data) {
        const {
          getTokens: { access_token, refresh_token },
        } = data;
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
      }
      setLoading(false);
    },
    onError: () => setLoading(false),
  });

  useEffect(() => {
    console.log('called');
    getTokens();
  }, []);

  //update tokens
  const handleLogin = (
    newAccessToken: string,
    newRefreshToken: string,
    navigate: NavigateFunction
  ) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);

    navigate(routesPaths.HOME);
  };

  const handleLogout = (navigate: NavigateFunction) => {
    Cookies.remove(ACCESS_TOKEN_COOKIE);
    Cookies.remove(REFRESH_TOKEN_COOKIE);

    setAccessToken(null);
    setRefreshToken(null);

    navigate(routesPaths.HOME);
  };

  const isAuthenticated = (): boolean => {
    return !!accessToken;
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        accessToken,
        refreshToken,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
