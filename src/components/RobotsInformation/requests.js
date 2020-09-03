import { gql } from '@apollo/client';

const GET_ROBOTS_LIST = gql`
  query GetRobots {
    robots: getRobots {
      id
    }
  }
`;

export { GET_ROBOTS_LIST }; // eslint-disable-line
