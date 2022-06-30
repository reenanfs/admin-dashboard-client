import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      role
      email
    }
  }
`;

export const GET_USER = gql`
  query GetUser($input: UserWhereUniqueInput!) {
    user(input: $input) {
      id
    }
  }
`;
