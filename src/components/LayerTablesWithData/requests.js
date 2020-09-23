import { gql } from '@apollo/client';

const GET_LAYER = gql`
  query GetLayer($id: ID!) {
    layer: getMapLayer(id: $id) {
      id
      objects {
        id
        data
      }
    }
  }
`;

const SUBSCRIBE_LAYER_UPDATE = gql`
  subscription SubscribeLayerUpdate($id: ID!) {
    layer: layerChanged(id: $id) {
      id
      objects {
        id
        data
      }
    }
  }
`;

export { GET_LAYER, SUBSCRIBE_LAYER_UPDATE }; // eslint-disable-line
