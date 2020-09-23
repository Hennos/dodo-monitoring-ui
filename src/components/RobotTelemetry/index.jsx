import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import types from './types';

import './index.css';

const RobotTelemetry = ({ stylization, telemetry }) => (
  <ul className={classNames('robot-telemetry', stylization)}>
    {telemetry.battery && (
      <li className="telemetry-row">{`Заряд батареи: ${telemetry.battery}`}</li>
    )}
    <li className="telemetry-row">
      {telemetry.position
        ? `Текущая позиция: x = ${telemetry.position.x}, y = ${telemetry.position.y}`
        : 'Текущая позиция неизвестна'}
    </li>
    {telemetry.lastActivity && (
      <li className="telemetry-row">{`Был активен: ${telemetry.lastActivity}`}</li>
    )}
  </ul>
);

RobotTelemetry.propTypes = {
  stylization: PropTypes.string,
  telemetry: PropTypes.shape(types.telemetry)
};

RobotTelemetry.defaultProps = {
  stylization: '',
  telemetry: {}
};

export default RobotTelemetry;
