import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import L from 'leaflet';
import { Marker } from 'react-leaflet';

import { GET_ROBOT, SUBSCRIBE_ROBOT_POSITION } from './requests';

import iconPosition from './position.svg';

const ObjectRobot = ({ id }) => {
  const { data: initialData, loading, error } = useQuery(GET_ROBOT, { variables: { id } });

  const { data: updatedData } = useSubscription(SUBSCRIBE_ROBOT_POSITION, {
    variables: { id }
  });

  if (loading || error) return null;

  const robot = updatedData ? updatedData.robot : initialData.robot;

  return (
    <Marker
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
