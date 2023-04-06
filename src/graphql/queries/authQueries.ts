import { gql } from '@apollo/client';

export const WHO_AM_I = gql`
  query WhoAmI {
    whoAmI {
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
        }
      }
    }
  }
`;

export const REFRESH_TOKEN = gql`
  query RefreshToken {
    refreshToken {
      access_token
      refresh_token
    }
  }
`;

export const LOCAL_SIGNOUT = gql`
  mutation LocalSignout($input: LocalSignoutInput!) {
    localSignout(input: $input) {
      id
    }
  }
`;