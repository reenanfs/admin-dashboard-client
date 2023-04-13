import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';

import { UploadAndHttpLink } from './links/UploadAndHttpLink';

export const createApolloClientFactory = (apolloLinks: ApolloLink[] = []) => {
  return new ApolloClient({
    link: ApolloLink.from([...apolloLinks, UploadAndHttpLink]),
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });
};
