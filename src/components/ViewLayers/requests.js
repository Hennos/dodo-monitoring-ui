import { gql } from '@apollo/client';

const GET_LAYERS = gql`
  query GetLayers {
    mapLayers: getMapLayers {
      id
      name
    }
  }
`;

export { GET_LAYERS }; // eslint-disable-line
