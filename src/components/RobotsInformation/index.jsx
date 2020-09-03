import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useQuery } from '@apollo/client';
import Control from 'react-leaflet-control';

import Button from '../Button';
import RobotDescriptor from '../RobotDescriptor';

import { GET_ROBOTS_LIST } from './requests';

import './index.css';

const RobotsInformation = ({ position, stylization }) => {
  const [collapsed, setCollapse] = useState(false);
  const { data, loading, error } = useQuery(GET_ROBOTS_LIST);

  if (loading || error) return null;

  const { robots } = data;

  return (
    <Control position={position}>
      <div className={classNames('robots-information leaflet-control-layers', stylization)}>
        {collapsed ? (
          <div className="robot-info-collapsed">
            <div className="robot-info-title">
              <span>Список платформ</span>
              <Button name="open" stylization="control-button" onClick={() => setCollapse(false)}>
                <i className="fas fa-chevron-down" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="robot-info-full">
            <div className="robot-info-title">
              <span>Список платформ</span>
              <Button name="close" stylization="control-button" onClick={() => setCollapse(true)}>
                <i className="fas fa-times" />
              </Button>
            </div>
            {robots.map(({ id }) => (
              <RobotDescriptor key={id} id={id} stylization="description-row" />
            ))}
          </div>
        )}
      </div>
    </Control>
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
