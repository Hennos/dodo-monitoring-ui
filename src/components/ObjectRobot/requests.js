import gql from 'graphql-tag';

const GET_ROBOT = gql`
  query GetRobot($id: ID!) {
    robot: getRobot(id: $id) {
      id
      position
    }
  }
`;

const SUBSCRIBE_ROBOT_POSITION = gql`
  subscription SubscribeUpdateRobotPosition($id: ID!) {
    robot: updatedRobotPosition(id: $id) {
      id
      position
    }
  }
`;

export { GET_ROBOT, SUBSCRIBE_ROBOT_POSITION }; // eslint-disable-line
