import { ReactNode } from 'react';
import { Navigate, Route } from 'react-router-dom';

interface Children {
  children: ReactNode;
}
// export const getAccessToken = () => Cookies.get('access_token');
// export const getRefreshToken = () => Cookies.get('refresh_token');
// export const isAuthenticated = () => !!getAccessToken();

const PrivateRoute = ({ children }: Children) => {
  const token = localStorage.getItem('auth');

  return <>{token ? children : <Navigate to="/login" replace={true} />}</>;
};

export default PrivateRoute;
