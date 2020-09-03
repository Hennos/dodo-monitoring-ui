import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useQuery, useSubscription } from '@apollo/client';

import RobotTelemetry from '../RobotTelemetry';

import { GET_ROBOT_DESCRIPTION, SUBSCRIBE_ROBOT_POSITION } from './requests';

import './index.css';

const RobotDescriptor = ({ id, stylization }) => {
  const [showTelemetry, setShowTelemetry] = useState(false);

  const { data, loading, error } = useQuery(GET_ROBOT_DESCRIPTION, { variables: { id } });

  if (loading || error) return null;

  // const { data } = useSubscription(SUBSCRIBE_ROBOT_POSITION, { variables: { id } });

  const { robot } = data;
  return (
    <div className={classNames('robot-descriptor', stylization)}>
      <div className="robot-title">
        <div className="robot-marker">
          <i className="fa fa-bullseye" style={{ color: robot.markerColor }} />
        </div>
        <button
          className="details-link"
          type="button"
          onClick={() => setShowTelemetry(!showTelemetry)}
        >
          {robot.name}
        </button>
      </div>
      {showTelemetry && (
        <RobotTelemetry
          stylization="descriptor-telemetry"
          telemetry={{ lastActivity: robot.lastActivity, position: robot.position }}
        />
      )}
    </div>
  );
};

RobotDescriptor.propTypes = {
  id: PropTypes.string.isRequired,
  stylization: PropTypes.string
};

RobotDescriptor.defaultProps = {
  stylization: ''
};

export default RobotDescriptor;
