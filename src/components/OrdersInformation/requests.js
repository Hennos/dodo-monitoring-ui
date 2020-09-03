import { gql } from '@apollo/client';

const GET_ORDERS_LIST = gql`
  query GetOrders {
    orders: getOrders {
      id
    }
  }
`;

const SUBSCRIBE_ORDERS_STATUS_LIST = gql`
  subscription SubscribeUpdateOrderStatus {
    orders: ordersStatusListChanged {
      id
    }
  }
`;

export { GET_ORDERS_LIST, SUBSCRIBE_ORDERS_STATUS_LIST }; // eslint-disable-line
