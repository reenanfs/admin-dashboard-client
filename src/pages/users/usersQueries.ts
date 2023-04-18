import { gql } from '@apollo/client';

export const GET_USERS_PAGE_DATA = gql`
  query GetUsersPageData($input: ProjectWhereUniqueInput!) {
    project(input: $input) {
      projectMemberships {
        user {
          id
          name
          credential {
            email
          }
        }
        role {
          id
          name
        }
      }
      owner {
        id
        name
        credential {
          email
        }
      }
    }
  }
`;

export const GET_USERS_PAGE_ROLES = gql`
  query GetUsersPageRoles {
    roles {
      id
      name
    }
  }
`;

export const CREATE_USER_TO_PROJECT = gql`
  mutation CreateUserToProject($input: CreateUserToProjectInput!) {
    createUserToProject(input: $input) {
      id
    }
  }
`;

export const UPDATE_USER_IN_PROJECT = gql`
  mutation UpdateUserInProject($input: UpdateUserInProjectInput!) {
    updateUserInProject(input: $input) {
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
