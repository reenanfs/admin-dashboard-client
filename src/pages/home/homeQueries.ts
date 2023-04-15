import { gql } from '@apollo/client';

export const GET_HOME_DATA = gql`
  query GetHomeData($input: ProjectWhereUniqueInput!) {
    project(input: $input) {
      tasks {
        id
        name
      }
      projectMemberships {
        user {
          id
          name
        }
      }
      id
      name
    }
  }
`;
