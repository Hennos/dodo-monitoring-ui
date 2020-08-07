import gql from 'graphql-tag';

const GET_LAYER = gql`
  query GetLayer($id: ID!) {
    layer: getMapLayer(id: $id) {
      id
      name
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
      name
      objects {
        id
        data
      }
    }
  }
`;

export { GET_LAYER, SUBSCRIBE_LAYER_UPDATE }; // eslint-disable-line
