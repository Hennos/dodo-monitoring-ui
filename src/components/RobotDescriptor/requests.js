import gql from 'graphql-tag';

const GET_ROBOT_TELEMETRY = gql`
  query GetRobotTelemetry($id: ID!) {
    robot: getRobot(id: $id) {
      id
      name
      telemetry
    }
  }
`;

export { GET_ROBOT_TELEMETRY }; // eslint-disable-line
