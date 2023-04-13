import { gql } from '@apollo/client';

export const LOCAL_SIGNIN = gql`
  mutation LocalSignin($input: AuthInput!) {
    localSignin(input: $input) {
      access_token
      refresh_token
      credential {
        id
        email
        user {
          id
          name
          photoUrl
          isAdmin
          currentProject {
            id
          }
        }
      }
    }
  }
`;
