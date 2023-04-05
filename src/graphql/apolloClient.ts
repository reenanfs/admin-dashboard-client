import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { errorLink } from './links/onErrorLink';
import { httpLink } from './links/httpLink';

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
