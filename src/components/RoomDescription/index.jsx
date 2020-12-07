import React from 'react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { GET_ROOM_DESCRIPTION } from './requests';

import './index.css';

const RoomDescription = ({ id, stylization }) => {
  const { data, loading, error } = useQuery(GET_ROOM_DESCRIPTION, { variables: { id } });

  if (loading || error) return null;

  const { room } = data;
  return (
    <div className={classNames('room-description', stylization)}>
      <i className="room-status" />
      <span className="room-name">{room.name}</span>
    </div>
  );
};

RoomDescription.propTypes = {
  id: PropTypes.string.isRequired,
  stylization: PropTypes.string
};

RoomDescription.defaultProps = {
  stylization: ''
};

export default RoomDescription;
