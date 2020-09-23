import React from 'react';
import { useQuery } from '@apollo/client';

import ObjectRobotWithData from '../ObjectRobotWithData';

import { GET_ROBOTS } from './requests';

const LayerRobots = () => {
  const { data, loading, error } = useQuery(GET_ROBOTS);

  if (loading || error) return null;

  const { robots } = data;

  return robots.map(({ id }) => <ObjectRobotWithData key={id} id={id} />);
};

export default LayerRobots;
