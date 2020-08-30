import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSubscription } from '@apollo/react-hooks';

import RobotTelemetry from '../RobotTelemetry';

import { SUBSCRIBE_ROBOT_POSITION } from './requests';

import './index.css';

const RobotDescriptor = ({ id, name, lastActivity, stylization }) => {
  const [showTelemetry, setShowTelemetry] = useState(false);

  const { data } = useSubscription(SUBSCRIBE_ROBOT_POSITION, { variables: { id } });

  const position = data ? data.robot.position : null;

  const telemetry = useMemo(() => ({ lastActivity, position }), [lastActivity, position]);
  return (
    <div className={classNames('robot-descriptor', stylization)}>
      <div className="robot-title">
        <div className="robot-marker">
          <i className="fa fa-bullseye" />
        </div>
        <button
          className="details-link"
          type="button"
          onClick={() => setShowTelemetry(!showTelemetry)}
        >
          {name}
        </button>
      </div>
      {showTelemetry && <RobotTelemetry stylization="descriptor-telemetry" telemetry={telemetry} />}
    </div>
  );
};

RobotDescriptor.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  lastActivity: PropTypes.string,
  stylization: PropTypes.string
};

RobotDescriptor.defaultProps = {
  name: 'robot-platform',
  lastActivity: null,
  stylization: ''
};

export default RobotDescriptor;
