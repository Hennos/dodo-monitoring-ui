import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DataRoomStatus from '../DataRoomStatus';

import './index.css';

const ActiveRoomStatus = ({ id, stylization }) => {
  return (
    <div className={classNames('active-room-status', stylization)}>
      <DataRoomStatus id={id}>
        {room => (room ? <span>{room.name}</span> : <span>Получение...</span>)}
      </DataRoomStatus>
    </div>
  );
};

ActiveRoomStatus.propTypes = {
  id: PropTypes.string.isRequired,
  stylization: PropTypes.string
};

ActiveRoomStatus.defaultProps = {
  stylization: ''
};

export default ActiveRoomStatus;
