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

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
      name
      role
    }
  }
`;

export const UPDATE_USER = gql`
  mutation Mutation($input: UpdateUserInput!) {
    updateUser(input: $input) {
      name
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
