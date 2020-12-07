import { gql } from '@apollo/client';

const GET_ROOM_DESCRIPTION = gql`
  query GetRoomDescription($id: ID!) {
    room: getRoom(id: $id) {
      name
    }
  }
`;

export { GET_ROOM_DESCRIPTION }; // eslint-disable-line
