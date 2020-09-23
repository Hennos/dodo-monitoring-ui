import { gql } from '@apollo/client';

const GET_ROBOT_MAP_CONFIG = gql`
  query GetRobotMapConfig {
    config: getMapConfig {
      width
      height
      scale
    }
  }
`;

export { GET_ROBOT_MAP_CONFIG }; // eslint-disable-line
