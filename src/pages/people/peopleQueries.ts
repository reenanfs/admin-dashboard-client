import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation Mutation($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation Mutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
    }
  }
`;

export const DELETE_USER = gql`
  mutation Mutation($input: UserWhereUniqueInput!) {
    deleteUser(input: $input) {
      id
    }
  }
`;

export const DELETE_USERS = gql`
  mutation Mutation($input: DeleteUsersInput) {
    deleteUsers(input: $input) {
      count
    }
  }
`;
