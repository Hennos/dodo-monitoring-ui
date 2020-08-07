import gql from 'graphql-tag';

const GET_ROBOTS = gql`
  query GetRobots {
    robots: getRobots {
      id
      name
    }
  }
`;

export { GET_ROBOTS }; // eslint-disable-line
