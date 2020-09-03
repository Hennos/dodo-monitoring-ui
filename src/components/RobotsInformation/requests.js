import { gql } from '@apollo/client';

const GET_ROBOTS_LIST = gql`
  query GetRobots {
    robots: getRobots {
      id
      name
      lastActivity
    }
  }
`;

export { GET_ROBOTS_LIST }; // eslint-disable-line
