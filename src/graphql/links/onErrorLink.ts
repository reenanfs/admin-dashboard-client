import { ApolloQueryResult, Observable } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { REFRESH_TOKEN } from 'graphql/queries/authQueries';

import { createApolloClientFactory } from 'graphql/apolloClient';

// Creating new client to avoid apollo caching the query when receiving 2 UNAUTHENTICATED in a row
const apolloClient = createApolloClientFactory();

const refreshToken = async (): Promise<ApolloQueryResult<any>> => {
  return apolloClient.query({
    query: REFRESH_TOKEN,
  });
};

export const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      console.log(error.extensions?.code);
      if (error.extensions?.code === 'UNAUTHENTICATED') {
        // Access token has expired, refresh it and retry the failed operation
        return new Observable(observer => {
          refreshToken()
            .then(() => {
              // Retry the operation
              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              };
              forward(operation).subscribe(subscriber);
            })
            .catch(error => {
              // Refresh token failed, return the error to the client
              observer.error(error);
            });
        });
      }
    }
  }
});
