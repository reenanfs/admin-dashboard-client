import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';

import { httpLink } from './links/httpLink';

export const createApolloClientFactory = (apolloLinks: ApolloLink[] = []) => {
  return new ApolloClient({
    link: ApolloLink.from([...apolloLinks, httpLink]),
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });
};
