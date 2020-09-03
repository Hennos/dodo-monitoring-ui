import { gql } from '@apollo/client';

const GET_ORDER_DESCRIPTION = gql`
  query GetOrderDescription($id: ID!) {
    order: getOrder(id: $id) {
      id
      status
      processed
    }
  }
`;

const SUBSCRIBE_ORDER_STATUS = gql`
  subscription SubscribeUpdateOrderStatus($id: ID!) {
    order: orderStatusChanged(id: $id) {
      id
      status
      processed
    }
  }
`;

export { GET_ORDER_DESCRIPTION, SUBSCRIBE_ORDER_STATUS }; // eslint-disable-line
