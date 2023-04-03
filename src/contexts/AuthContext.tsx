import { useState, useEffect, ReactNode, createContext } from 'react';
import Cookies from 'js-cookie';
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from 'constants/authConstants';

interface IAuthProviderProps {
  children: ReactNode;
}

export interface AuthContextProps {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (newAccessToken: string, newRefreshToken: string) => void;
  logout: () => void;
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

  // Check cookies for tokens on mount
  useEffect(() => {
    const storedAccessToken = Cookies.get(ACCESS_TOKEN_COOKIE);
    const storedRefreshToken = Cookies.get(REFRESH_TOKEN_COOKIE);

    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }

    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);
    }
  }, []);

  //update tokens
  const login = (newAccessToken: string, newRefreshToken: string) => {
    console.log(newAccessToken);
    Cookies.set(ACCESS_TOKEN_COOKIE, newAccessToken);
    Cookies.set(REFRESH_TOKEN_COOKIE, newRefreshToken);

    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
  };

  const logout = () => {
    Cookies.remove(ACCESS_TOKEN_COOKIE);
    Cookies.remove(REFRESH_TOKEN_COOKIE);

    setAccessToken(null);
    setRefreshToken(null);
  };

  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, accessToken, refreshToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
