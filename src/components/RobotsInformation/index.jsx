import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useQuery } from '@apollo/react-hooks';
import Control from 'react-leaflet-control';

import RobotDescriptor from '../RobotDescriptor';

import { GET_ROBOTS_LIST } from './requests';

import './index.css';

const RobotsInformation = ({ position, stylization }) => {
  const { data, loading, error } = useQuery(GET_ROBOTS_LIST);

  if (loading || error) return null;

  const { robots } = data;

  return (
    robots.length && (
      <Control position={position}>
        <div className={classNames('editing-control', 'leaflet-control-layers', stylization)}>
          <div className="robots-information">
            {robots.map(({ id }) => (
              <RobotDescriptor key={id} id={id} />
            ))}
          </div>
        </div>
      </Control>
    )
  );
};

RobotsInformation.propTypes = {
  position: PropTypes.string,
  stylization: PropTypes.string
};

RobotsInformation.defaultProps = {
  position: 'topleft',
  stylization: ''
};

export default RobotsInformation;
