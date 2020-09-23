import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_ROBOT_MAP_CONFIG } from './requests';

import Map from '../Map';

const MapWithConfig = ({ ...props }) => {
  const { data, loading, error } = useQuery(GET_ROBOT_MAP_CONFIG);

  if (loading || error) return null;

  const { config } = data;
  return config && <Map {...props} config={config} />;
};

export default MapWithConfig;
