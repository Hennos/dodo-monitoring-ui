import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useQuery, useSubscription } from '@apollo/react-hooks';

import RobotTelemetry from '../RobotTelemetry';

import { GET_ROBOT_TELEMETRY } from './requests';

import './index.css';

const RobotDescriptor = ({ id, stylization }) => {
  const [telemetry, showTelemetry] = useState(false);
  const { data, loading, error } = useQuery(GET_ROBOT_TELEMETRY, { variables: { id } });

  if (loading || error) return null;

  const { robot } = data;

  return (
    <div className={classNames('robot-descriptor', stylization)}>
      <div className="robot-title">
        <div className="robot-marker">
          <i className="fa fa-bullseye" />
        </div>
        <button className="details-link" type="button" onClick={() => showTelemetry(!telemetry)}>
          {id}
        </button>
      </div>
      {telemetry && (
        <RobotTelemetry stylization="descriptor-telemetry" telemetry={robot.telemetry} />
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
