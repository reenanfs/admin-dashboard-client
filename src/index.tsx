import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';

import { ApolloProvider } from '@apollo/client';

import App from 'App';
import { DialogsProvider } from 'contexts/DialogsContext';
import { AuthProvider } from 'contexts/AuthContext';
import { CurrentUserProvider } from 'contexts/CurrentUserContext';
import { theme } from 'styles/theme';
import { createApolloClientFactory } from 'graphql/apolloClient';
import { errorLink } from 'graphql/links/onErrorLink';

const apolloClient = createApolloClientFactory([errorLink]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={apolloClient}>
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
