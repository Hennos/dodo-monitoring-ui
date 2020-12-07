import { gql } from '@apollo/client';

const GET_ACTIVE_ROOM_STATUS = gql`
  query GetActiveRoomStatus {
    id: activeRoomId @client
  }
`;

export { GET_ACTIVE_ROOM_STATUS }; // eslint-disable-line
