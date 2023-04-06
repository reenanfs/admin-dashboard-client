import { createHttpLink } from '@apollo/client';

export const GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql';

export const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
  credentials: 'include',
});
