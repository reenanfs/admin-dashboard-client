import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import type {} from '@mui/lab/themeAugmentation';

import Layout from 'components/layout/Layout';
import Home from 'pages/home/Home';
import People from 'pages/people/People';
import NotFound from 'pages/status/not-found/NotFound';
import CssBaseline from '@mui/material/CssBaseline';
import { routesPaths } from 'constants/routesConstants';
import Login from 'pages/auth/login/Login';
import PrivateRoute from 'auth/PrivateRoute';
import Signup from 'pages/auth/signup/Signup';

const App = (): JSX.Element => {
  const theme = createTheme({
    components: {
      MuiListItemIcon: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.primary.main,
          }),
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.primary.main,
          }),
        },
      },
      MuiLink: {
        defaultProps: {
          color: 'inherit',
          underline: 'none',
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            '&.Mui-disabled': {
              cursor: 'not-allowed',
            },
          },
          root: {
            '&.Mui-disabled': {
              cursor: 'not-allowed !important',
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
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
              path={routesPaths.PEOPLE}
              element={
                <PrivateRoute>
                  <People />
                </PrivateRoute>
              }
            />
            <Route path={routesPaths.LOGIN} element={<Login />} />
            <Route path={routesPaths.REGISTER} element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
