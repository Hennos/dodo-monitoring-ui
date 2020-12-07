import React from 'react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ActiveOperatorStatus from '../ActiveOperatorStatus';
import ActiveRoomStatus from '../ActiveRoomStatus';
import ExitPanel from '../ExitPanel';

import { GET_USER_STATUS } from './requests';

import './index.css';

const UserStatus = ({ stylization }) => {
  const { data, loading, error } = useQuery(GET_USER_STATUS);

  if (loading || error) return null;

  const { operatorId, operatorRole, roomId } = data;
  return (
    <div className={classNames('user-status', stylization)}>
      {roomId && <ActiveRoomStatus stylization="user-status-badge" id={roomId} />}
      {operatorId && (
        <ActiveOperatorStatus stylization="user-status-badge" id={operatorId} role={operatorRole} />
      )}
      {operatorId && <ExitPanel stylization="use-status-exit-panel" />}
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
