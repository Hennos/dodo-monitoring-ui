import { gql } from '@apollo/client';

const GET_TABLES_EDITING_STATUS = gql`
  query GetTablesEditingStatus {
    editing: tablesEditingStatus @client
  }
`;

export { GET_TABLES_EDITING_STATUS }; // eslint-disable-line
