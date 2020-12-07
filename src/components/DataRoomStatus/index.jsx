import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';

import { GET_ROOM_STATUS } from './requests';

const DataRoomStatus = ({ id, children }) => {
  const { data, loading, error } = useQuery(GET_ROOM_STATUS, { variables: { id } });

  return children(loading || error ? null : data.room);
};

DataRoomStatus.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
};

export default DataRoomStatus;
