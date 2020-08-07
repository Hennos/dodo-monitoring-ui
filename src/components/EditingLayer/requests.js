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

export { GET_LAYER }; // eslint-disable-line
