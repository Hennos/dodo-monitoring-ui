import { gql } from '@apollo/client';

const GET_ROOMS_LIST = gql`
  query GetRooms {
    rooms: getRooms {
      id
    }
  }
`;

export { GET_ROOMS_LIST }; // eslint-disable-line
