import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useSubscription } from '@apollo/client';

import Tables from '../Tables';

import { GET_LAYER, SUBSCRIBE_LAYER_UPDATE } from './requests';

const LayerTablesWithData = ({ update }) => {
  const { ...initialResult } = useQuery(GET_LAYER, { variables: { id: '1' } });
  const { ...updatedResult } = useSubscription(SUBSCRIBE_LAYER_UPDATE, { variables: { id: '1' } });

  if (initialResult.loading || initialResult.error) return null;

  const { objects: loadedTables } =
    update && updatedResult.data ? updatedResult.data.layer : initialResult.data.layer;

  return <Tables objects={loadedTables} />;
};

LayerTablesWithData.propTypes = {
  update: PropTypes.bool.isRequired
};

export default LayerTablesWithData;
