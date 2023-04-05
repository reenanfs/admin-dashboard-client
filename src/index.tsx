import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import App from 'App';
import { DialogsProvider } from 'contexts/DialogsContext';
import { AuthProvider } from 'contexts/AuthContext';
import { CurrentUserProvider } from 'contexts/CurrentUserContext';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <CurrentUserProvider>
        <AuthProvider>
          <DialogsProvider>
            <App />
          </DialogsProvider>
        </AuthProvider>
      </CurrentUserProvider>
    </ThemeProvider>
  </ApolloProvider>
);
