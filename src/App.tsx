import { BrowserRouter, Routes, Route } from 'react-router-dom';

import type {} from '@mui/lab/themeAugmentation';

import Layout from 'components/layout/Layout';
import Home from 'pages/home/Home';
import People from 'pages/people/People';
import NotFound from 'pages/status/not-found/NotFound';
import CssBaseline from '@mui/material/CssBaseline';
import { routesPaths } from 'constants/routesConstants';
import Login from 'pages/auth/login/Login';
import PrivateRoute from 'components/routes/PrivateRoute';
import Signup from 'pages/auth/signup/Signup';
import Tasks from 'pages/tasks/Tasks';
import Settings from 'pages/settings/Settings';

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Layout>
        <Routes>
          <Route
            path={routesPaths.HOME}
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path={routesPaths.TASKS}
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />
          <Route
            path={routesPaths.PEOPLE}
            element={
              <PrivateRoute>
                <People />
              </PrivateRoute>
            }
          />
          <Route
            path={routesPaths.SETTINGS}
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route path={routesPaths.LOGIN} element={<Login />} />
          <Route path={routesPaths.REGISTER} element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
