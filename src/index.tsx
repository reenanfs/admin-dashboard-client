import React from 'react';
import ReactDOM from 'react-dom/client';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import App from 'App';
import { DialogsProvider } from 'contexts/DialogsContext';
import { AuthProvider } from 'contexts/AuthContext';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <DialogsProvider>
        <App />
      </DialogsProvider>
    </AuthProvider>
  </ApolloProvider>
);
