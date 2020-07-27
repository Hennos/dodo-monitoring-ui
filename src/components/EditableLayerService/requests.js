import gql from 'graphql-tag';

const CREATE_OBJECT = gql`
  mutation CreateObject($id: ID!, $object: JSON!) {
    createObject(id: $id, object: $object)
  }
`;

const UPDATE_OBJECTS = gql`
  mutation UpdateObjects($id: ID!, $objects: JSON!) {
    updateObjects(id: $id, objects: $objects)
  }
`;

const REMOVE_OBJECTS = gql`
  mutation RemoveObjects($id: ID!, $objects: JSON!) {
    removeObjects(id: $id, objects: $objects)
  }
`;

export { CREATE_OBJECT, UPDATE_OBJECTS, REMOVE_OBJECTS }; // eslint-disable-line
