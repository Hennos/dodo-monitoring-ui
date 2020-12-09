import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DataRoomStatus from '../DataRoomStatus';
import Loading from '../Loading';

import './index.css';
import Button from '../Button';

const ActiveRoomStatus = ({ id, stylization, onExit }) => {
  return (
    <div className={classNames('active-room-status', stylization)}>
      <DataRoomStatus id={id}>
        {room =>
          room ? (
            <div className="active-room-status-data">
              <span>{room.name}</span>
              <Button stylization="active-room-exit-button" onClick={onExit}>
                <i className="fas fa-times" />
              </Button>
            </div>
          ) : (
            <Loading />
          )
        }
      </DataRoomStatus>
    </div>
  );
};

ActiveRoomStatus.propTypes = {
  id: PropTypes.string.isRequired,
  stylization: PropTypes.string,
  onExit: PropTypes.func
};

ActiveRoomStatus.defaultProps = {
  stylization: '',
  onExit: () => {}
};

export default ActiveRoomStatus;
