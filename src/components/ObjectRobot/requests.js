import { gql } from '@apollo/client';

const GET_ROBOT_WITH_POSITION = gql`
  query GetRobotWithPosition($id: ID!) {
    robot: getRobot(id: $id) {
      id
      position
      markerColor @client
    }
  }
`;

const SUBSCRIBE_ROBOT_POSITION = gql`
  subscription SubscribeUpdateRobotPosition($id: ID!) {
    robot: updatedRobotPosition(id: $id) {
      id
      position
      color @client
    }
  }
`;

export { GET_ROBOT_WITH_POSITION, SUBSCRIBE_ROBOT_POSITION }; // eslint-disable-line
