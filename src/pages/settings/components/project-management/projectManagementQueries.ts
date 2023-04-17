import { gql } from '@apollo/client';

export const GET_PROJECT_MANAGEMENT_DATA = gql`
  query GetProjectManagementData($input: UserWhereUniqueInput!) {
    user(input: $input) {
      projectsOwned {
        id
        name
        description
        projectMemberships {
          createdAt
        }
        tasks {
          createdAt
        }
      }
      projectMemberships {
        project {
          id
          name
        }
      }
    }
  }
`;

export const CREATE_PROJECT_MANAGEMENT_DATA = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      name
      description
      createdAt
      projectMemberships {
        createdAt
      }
      tasks {
        createdAt
      }
    }
  }
`;

export const UPDATE_PROJECT_MANAGEMENT_DATA = gql`
  mutation UpdateProject($input: UpdateProjectInput!) {
    updateProject(input: $input) {
      id
      name
      description
      createdAt
      projectMemberships {
        createdAt
      }
      tasks {
        createdAt
      }
    }
  }
`;

export const DELETE_PROJECT_MANAGEMENT_DATA = gql`
  mutation DeleteProject($input: ProjectWhereUniqueInput!) {
    deleteProject(input: $input) {
      id
    }
  }
`;

export const UPDATE_CURRENT_PROJECT_MANAGEMENT_DATA = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      currentProject {
        id
      }
    }
  }
`;
