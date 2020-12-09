import React, { useCallback } from 'react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { activeRoomId } from '../../apollo/cache';

import { GET_ROOM_DESCRIPTION } from './requests';

import './index.css';

const RoomDescription = ({ id, stylization }) => {
  const { data, loading, error } = useQuery(GET_ROOM_DESCRIPTION, { variables: { id } });

  const onChooseRoom = useCallback(() => {
    activeRoomId(id);
  }, [id]);

  if (loading || error) return null;

  const { room } = data;
  return (
    <button
      className={classNames('room-description', stylization)}
      type="button"
      onClick={onChooseRoom}
    >
      <i className="room-status" />
      <span className="room-name">{room.name}</span>
    </button>
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
