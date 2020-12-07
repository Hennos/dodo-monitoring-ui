import { gql } from '@apollo/client';

const GET_APP_STATUS = gql`
  query GetAppStatus {
    operatorId: activeOperatorId @client
    roomId: activeRoomId @client
  }
`;

export { GET_APP_STATUS }; // eslint-disable-line
