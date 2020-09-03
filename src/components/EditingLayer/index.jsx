import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import L from 'leaflet';
import { FeatureGroup, Polygon } from 'react-leaflet';

import EditableLayerService from '../EditableLayerService';

import { GET_LAYER } from './requests';

const EditingLayer = ({ id }) => {
  const { data, loading, error } = useQuery(GET_LAYER, { variables: { id } });

  if (loading || error) return null;

  const formatObjects = data.layer.objects.map(({ id: objectId, data: objectData }) => {
    return {
      id: objectId,
      coordinates: L.GeoJSON.coordsToLatLngs(objectData.geometry.coordinates[0])
    };
  });
  return (
    <FeatureGroup>
      <EditableLayerService
        layer={id}
        options={{
          draw: {
            rectangle: {
              showRadius: false
            },
            polyline: false,
            circle: false,
            circlemarker: false,
            polygon: false
          },
          collapsed: false
        }}
      >
        {formatObjects.map(object => (
          <Polygon key={object.id} id={object.id} positions={object.coordinates} color="red" />
        ))}
      </EditableLayerService>
    </FeatureGroup>
  );
};

EditingLayer.propTypes = {
  id: PropTypes.string.isRequired
};

export default EditingLayer;
