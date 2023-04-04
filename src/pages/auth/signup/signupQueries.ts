import { gql } from '@apollo/client';

export const LOCAL_SIGNUP = gql`
  mutation LocalSignup($input: AuthInput!) {
    localSignup(input: $input) {
      access_token
      refresh_token
    }
  }
`;
