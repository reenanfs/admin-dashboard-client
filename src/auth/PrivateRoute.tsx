import { routesPaths } from 'constants/routesConstants';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';

interface IPrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: IPrivateRouteProps) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={routesPaths.LOGIN} replace />
  );
};

export default PrivateRoute;
