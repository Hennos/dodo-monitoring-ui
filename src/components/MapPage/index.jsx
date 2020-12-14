import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_ROBOT_MAP_CONFIG } from './requests';

import Map from '../Map';

const MapPage = () => {
  const { data, loading, error } = useQuery(GET_ROBOT_MAP_CONFIG);

  if (loading || error) return null;

  const { config } = data;
  return config && <Map config={config} />;
};

export default MapPage;
