import gql from 'graphql-tag';

const GET_LAYERS_STATE = gql`
  query GetOrderInfo {
    layers {
      orderInfo {
        id
        name
        batteryCharge
        lastActivity
        orderData {
          id
          orderNumber
          tableNumber
          orderDescription
        }
      }
    }
  }
`;

export { GET_LAYERS_STATE }; // eslint-disable-line
