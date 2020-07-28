import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import LayerTables from '../LayerTables';

import { GET_LAYERS } from './requests';

const layers = { TABLES: '1' };
const viewLayers = new Map([[layers.TABLES, key => <LayerTables key={key} />]]);

const ViewLayers = ({ editing }) => {
  const { data, loading, error } = useQuery(GET_LAYERS);

  if (loading || error) return null;

  const { mapLayers } = data;

  return mapLayers
    .filter(({ id }) => id !== editing)
    .map(({ id }) => {
      const { component = null } = viewLayers.get(id) || {};
      return component;
    });
};

ViewLayers.propTypes = {
  editing: PropTypes.string
};

ViewLayers.defaultProps = {
  editing: null
};

export default ViewLayers;
