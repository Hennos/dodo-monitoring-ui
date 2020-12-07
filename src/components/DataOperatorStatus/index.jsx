import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';

import { GET_OPERATOR_STATUS } from './requests';

const DataOperatorStatus = ({ id, children }) => {
  const { data, loading, error } = useQuery(GET_OPERATOR_STATUS, { variables: { id } });

  return children(loading || error ? null : data.operator);
};

DataOperatorStatus.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
};

export default DataOperatorStatus;
