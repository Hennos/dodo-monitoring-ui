import React from 'react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { activeOperatorId, activeOperatorRole, activeRoomId } from '../../apollo/cache';

import ActiveOperatorStatus from '../ActiveOperatorStatus';
import ActiveRoomStatus from '../ActiveRoomStatus';

import { GET_USER_STATUS } from './requests';

import './index.css';
import Button from '../Button';

const UserStatus = ({ stylization }) => {
  const { data, loading, error } = useQuery(GET_USER_STATUS);

  if (loading || error) return null;

  const { operatorId, operatorRole, roomId } = data;
  return (
    <div className={classNames('user-status', stylization)}>
      {roomId && (
        <ActiveRoomStatus
          stylization="user-status-badge"
          id={roomId}
          onExit={() => {
            activeRoomId(null);
          }}
        />
      )}
      {operatorId && (
        <ActiveOperatorStatus stylization="user-status-badge" id={operatorId} role={operatorRole} />
      )}
      {operatorId && (
        <Button
          stylization="user-status-exit-button"
          onClick={() => {
            activeOperatorId(null);
            activeOperatorRole(null);
            activeRoomId(null);
          }}
        >
          <i className="fas fa-sign-out-alt" />
        </Button>
      )}
    </div>
  );
};

UserStatus.propTypes = {
  stylization: PropTypes.string
};

UserStatus.defaultProps = {
  stylization: ''
};

export default UserStatus;
