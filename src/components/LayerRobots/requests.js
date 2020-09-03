import { gql } from '@apollo/client';

const GET_ROBOTS = gql`
  query GetRobots {
    robots: getRobots {
      id
      name
    }
  }
`;

export { GET_ROBOTS }; // eslint-disable-line
