import { gql } from '@apollo/client';

export const HOME_DATA = gql`
  query {
    projects {
      id
      name
      description
    }
  }
`;
