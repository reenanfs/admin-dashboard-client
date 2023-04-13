import { gql } from '@apollo/client';

export const USER_PROFILE_UPDATE_USER = gql`
  mutation userProfileUpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      name
      photoUrl
    }
  }
`;
