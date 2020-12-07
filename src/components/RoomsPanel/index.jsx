import React from 'react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import RoomDescription from '../RoomDescription';

import { GET_ROOMS_LIST } from './reqeuests';

import './index.css';

const RoomsPanel = ({ stylization }) => {
  const { data, loading, error } = useQuery(GET_ROOMS_LIST);

  const rooms = (data && data.rooms) || [];
  return (
    <div className={classNames('rooms-panel modal-theme', stylization)}>
      <div className="panel-title">
        <span>Выберите помещение</span>
      </div>
      <div className="rooms-list">
        {loading && <p>Данные загружаются</p>}
        {error && <p>Ошибка загрузки данных</p>}
        {rooms.map(({ id }) => (
          <RoomDescription key={id} id={id} stylization="room-row" />
        ))}
      </div>
    </div>
  );
};

RoomsPanel.propTypes = {
  stylization: PropTypes.string
};

RoomsPanel.defaultProps = {
  stylization: ''
};

export default RoomsPanel;
