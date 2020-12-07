import { gql } from '@apollo/client';

const GET_USER_STATUS = gql`
  query GetUserStatus {
    operatorId: activeOperatorId @client
    operatorRole: activeOperatorRole @client
    roomId: activeRoomId @client
  }
`;

export { GET_USER_STATUS }; // eslint-disable-line
