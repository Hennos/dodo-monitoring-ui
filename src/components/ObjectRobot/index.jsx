import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useSubscription } from '@apollo/client';
import L from 'leaflet';
import { Marker } from 'react-leaflet';

import { GET_ROBOT_WITH_POSITION, SUBSCRIBE_ROBOT_POSITION } from './requests';

import './index.css';

const ObjectRobot = ({ id }) => {
  const { data, loading, error } = useQuery(GET_ROBOT_WITH_POSITION, { variables: { id } });
  // const { data } = useSubscription(SUBSCRIBE_ROBOT_POSITION, { variables: { id } });

  if (loading || error) return null;

  const { robot } = data;
  return (
    <Marker
      id={robot.id}
      position={[robot.position.y, robot.position.x]}
      icon={L.divIcon({
        className: 'robot-map-point',
        html: `<i class="fas fa-bullseye" style="color:${robot.markerColor}"></i>`
      })}
    />
  );
};

ObjectRobot.propTypes = {
  id: PropTypes.string.isRequired
};

export default ObjectRobot;
