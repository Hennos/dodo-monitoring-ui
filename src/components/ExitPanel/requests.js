import { gql } from '@apollo/client';

const GET_AUTH_STATUS = gql`
  query GetUserStatus {
    authOperatorId: activeOperatorId @client
    enterRoomId: activeRoomId @client
  }
`;

export { GET_AUTH_STATUS }; // eslint-disable-line
