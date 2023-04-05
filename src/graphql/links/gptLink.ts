import { ApolloQueryResult, fromPromise } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { apolloClient } from 'graphql/apolloClient';
import { REFRESH_TOKEN } from 'graphql/queries/authQueries';

const refreshToken = (): Promise<ApolloQueryResult<any>> => {
  return apolloClient.query({ query: REFRESH_TOKEN });
};

export const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err.extensions.code === 'UNAUTHENTICATED') {
        return fromPromise(
          refreshToken().catch(error => {
            // Handle token refresh errors e.g clear stored tokens, redirect to login
            return;
          })
        )
          .filter(value => Boolean(value))
          .flatMap(accessToken => {
            const oldHeaders = operation.getContext().headers;
            // modify the operation context with a new token
            operation.setContext({
              headers: {
                ...oldHeaders,
                authorization: `Bearer ${accessToken}`,
              },
            });

            // retry the request, returning the new observable
            return forward(operation);
          });
      }
    }
  }
});
