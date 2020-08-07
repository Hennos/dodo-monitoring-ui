import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useQuery, useSubscription } from '@apollo/react-hooks';

import Button from '../Button';

import { GET_ROBOT_TELEMETRY } from './requests';

import './index.css';

const controls = [
  {
    name: 'show',
    icon: 'far fa-eye',
    handler: () => {}
  }
  // {
  //   name: 'openMenu',
  //   icon: 'fas fa-ellipsis-h',
  //   handler: () => {}
  // }
];

const RobotDescriptor = ({ id, stylization }) => {
  const { data, loading, error } = useQuery(GET_ROBOT_TELEMETRY, { variables: { id } });

  if (loading || error) return null;

  const { robot } = data;

  return (
    <div className={classNames('robot-descriptor', stylization)}>
      <p className="robot-title">
        <span>{id}</span>
        {controls.map(({ name, icon, handler }) => (
          <Button key={name} name={name} stylization="control-button" onClick={handler}>
            <i className={icon} />
          </Button>
        ))}
      </p>
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
