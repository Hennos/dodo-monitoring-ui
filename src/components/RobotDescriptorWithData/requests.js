import { gql } from '@apollo/client';

const GET_ROBOT_DESCRIPTION = gql`
  query GetRobotDescription($id: ID!) {
    robot: getRobot(id: $id) {
      id
      name
      position
      lastActivity
      markerColor @client
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

export { GET_ROBOT_DESCRIPTION, SUBSCRIBE_ROBOT_POSITION }; // eslint-disable-line
