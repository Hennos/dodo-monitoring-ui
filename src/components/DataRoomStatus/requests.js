import { gql } from '@apollo/client';

const GET_ROOM_STATUS = gql`
  query GetRoomStatus($id: ID!) {
    room: getRoom(id: $id) {
      id
      name
    }
  }
`;

export { GET_ROOM_STATUS }; // eslint-disable-line
