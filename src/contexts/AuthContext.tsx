import { useState, useEffect, ReactNode, createContext } from 'react';
import Cookies from 'js-cookie';
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from 'constants/authConstants';
import { NavigateFunction } from 'react-router-dom';
import { routesPaths } from 'constants/routesConstants';

interface IAuthProviderProps {
  children: ReactNode;
}

export interface AuthContextProps {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (
    newAccessToken: string,
    newRefreshToken: string,
    navigate: NavigateFunction
  ) => void;
  logout: (navigate: NavigateFunction) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check cookies for tokens on mount
  useEffect(() => {
    const setTokens = async () => {
      const storedAccessToken = await Cookies.get(ACCESS_TOKEN_COOKIE);
      const storedRefreshToken = Cookies.get(REFRESH_TOKEN_COOKIE);
  
      if (storedAccessToken) {
        setAccessToken(storedAccessToken);
        setIsAuthenticated(true);
        setIsLoading(false);
      }
  
      if (storedRefreshToken) {
        setRefreshToken(storedRefreshToken);
      }
    }
    setTokens();    
  }, []);

  //update tokens
  const login = (
    newAccessToken: string,
    newRefreshToken: string,
    navigate: NavigateFunction
  ) => {
    Cookies.set(ACCESS_TOKEN_COOKIE, newAccessToken);
    Cookies.set(REFRESH_TOKEN_COOKIE, newRefreshToken);

    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);

    navigate(routesPaths.HOME);
  };

  const logout = (navigate: NavigateFunction) => {
    Cookies.remove(ACCESS_TOKEN_COOKIE);
    Cookies.remove(REFRESH_TOKEN_COOKIE);

    setAccessToken(null);
    setRefreshToken(null);

    navigate(routesPaths.HOME);
  };

  // if (0

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        accessToken,
        refreshToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
