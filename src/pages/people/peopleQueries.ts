import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($input: UserWhereUniqueInput!) {
    deleteUser(input: $input) {
      id
    }
  }
`;

export const DELETE_USERS = gql`
  mutation DeleteUsers($input: DeleteUsersInput) {
    deleteUsers(input: $input) {
      count
    }
  }
`;
