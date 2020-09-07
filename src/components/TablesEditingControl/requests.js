import { gql } from '@apollo/client';

const GET_EDITING_STATUS = gql`
  query GetEditingStatus {
    status: tablesEditingStatus @client
  }
`;

export { GET_EDITING_STATUS }; //eslint-disable-line
