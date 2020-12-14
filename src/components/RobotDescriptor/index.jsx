import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import RobotTelemetry from '../RobotTelemetry';

import './index.css';

const RobotDescriptor = ({ stylization, robot, subToUpdate }) => {
  const [showTelemetry, setShowTelemetry] = useState(false);

  useEffect(() => {
    subToUpdate();
  }, [subToUpdate]);

  const { name, lastActivity, position, markerColor } = robot;
  return (
    <div className={classNames('robot-descriptor', stylization)}>
      <div className="robot-title">
        <div className="robot-marker">
          <i className="fa fa-bullseye" style={{ color: markerColor }} />
        </div>
        <button
          className="details-link"
          type="button"
          onClick={() => setShowTelemetry(!showTelemetry)}
        >
          {name}
        </button>
      </div>
      {showTelemetry && (
        <RobotTelemetry stylization="descriptor-telemetry" telemetry={{ lastActivity, position }} />
      )}
    </div>
  );
};

RobotDescriptor.propTypes = {
  subToUpdate: PropTypes.func.isRequired,
  stylization: PropTypes.string,
  robot: PropTypes.shape({
    name: PropTypes.string,
    lastActivity: PropTypes.string,
    position: PropTypes.arrayOf(PropTypes.number),
    markerColor: PropTypes.string
  })
};

RobotDescriptor.defaultProps = {
  stylization: '',
  robot: {}
};

export default RobotDescriptor;
