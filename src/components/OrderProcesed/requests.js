import gql from 'graphql-tag';

const GET_PROCESSED_ROBOT = gql`
  query GetRobotName($id: ID!) {
    robot: getRobot(id: $id) {
      id
      name
    }
  }
`;

export { GET_PROCESSED_ROBOT }; // eslint-disable-line
