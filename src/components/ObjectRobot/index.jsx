import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useSubscription } from '@apollo/client';
import L from 'leaflet';
import { Marker } from 'react-leaflet';

import { SUBSCRIBE_ROBOT_POSITION } from './requests';

import iconPosition from './position.svg';

const ObjectRobot = ({ id }) => {
  const { data } = useSubscription(SUBSCRIBE_ROBOT_POSITION, { variables: { id } });

  if (!data) return null;

  const { robot } = data;
  return (
    <Marker
      id={robot.id}
      position={[robot.position.y, robot.position.x]}
      icon={L.icon({
        iconUrl: iconPosition,
        iconSize: L.point(20, 20)
      })}
    />
  );
};

ObjectRobot.propTypes = {
  id: PropTypes.string.isRequired
};

export default ObjectRobot;
