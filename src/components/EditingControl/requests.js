import gql from 'graphql-tag';

const GET_LAYERS = gql`
  query GetLayers {
    mapLayers: layers {
      id
      name
    }
  }
`;

export { GET_LAYERS }; // eslint-disable-line
