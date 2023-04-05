import { routesPaths } from 'constants/routesConstants';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { useWhoAmI } from 'hooks/useWhoAmI';
import LoadingPage from 'pages/status/loading/Loading';

interface IPrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: IPrivateRouteProps) => {
  const loading = useWhoAmI();
  const { isAuthenticated } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  return isAuthenticated() ? (
    <>{children}</>
  ) : (
    <Navigate to={routesPaths.LOGIN} replace />
  );
};

export default PrivateRoute;
