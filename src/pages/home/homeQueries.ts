import { gql } from '@apollo/client';

export const HOME_DATA = gql`
  query HomeData($input: ProjectWhereUniqueInput!) {
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
