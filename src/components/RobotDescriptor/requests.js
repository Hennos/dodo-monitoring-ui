import gql from 'graphql-tag';

const GET_ROBOT_TELEMETRY = gql`
  query GetRobotTelemetry($id: ID!) {
    robot: getRobot(id: $id) {
      id
      name
    }
  }
`;

export { GET_ROBOT_TELEMETRY }; // eslint-disable-line
