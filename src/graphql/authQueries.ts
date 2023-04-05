import { gql } from '@apollo/client';

export const GET_TOKENS = gql`
  query GetTokens {
    getTokens {
      access_token
      refresh_token
    }
  }
`;
