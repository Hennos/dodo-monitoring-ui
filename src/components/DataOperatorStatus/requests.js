import { gql } from '@apollo/client';

const GET_OPERATOR_STATUS = gql`
  query GetOperatorStatus($id: ID!) {
    operator: getOperator(id: $id) {
      id
      givenName
      familyName
      email
    }
  }
`;

export { GET_OPERATOR_STATUS }; // eslint-disable-line
