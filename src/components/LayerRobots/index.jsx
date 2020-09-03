import React from 'react';
import { useQuery } from '@apollo/client';

import ObjectRobot from '../ObjectRobot';

import { GET_ROBOTS } from './requests';

const LayerRobots = () => {
  const { data, loading, error } = useQuery(GET_ROBOTS);

  if (loading || error) return null;

  const { robots } = data;

  return robots.map(({ id }) => <ObjectRobot key={id} id={id} />);
};

export default LayerRobots;
