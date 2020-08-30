import gql from 'graphql-tag';

const SUBSCRIBE_ROBOT_POSITION = gql`
  subscription SubscribeUpdateRobotPosition($id: ID!) {
    robot: updatedRobotPosition(id: $id) {
      id
      position
    }
  }
`;

export { SUBSCRIBE_ROBOT_POSITION }; // eslint-disable-line
