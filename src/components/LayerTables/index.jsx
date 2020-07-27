import React from 'react';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import L from 'leaflet';
import { FeatureGroup, Polygon } from 'react-leaflet';

import { GET_LAYER, SUBSCRIBE_LAYER_UPDATE } from './requests';

const LayerTables = () => {
  const { data: initialData, loading, error } = useQuery(GET_LAYER, { variables: { id: '1' } });

  const { data: updatedData } = useSubscription(SUBSCRIBE_LAYER_UPDATE, { variables: { id: '1' } });

  if (loading || error) return null;

  const layer = updatedData ? updatedData.layer : initialData.layer;

  const formatObjects = layer.objects.map(({ id: objectId, data: objectData }) => {
    return {
      id: objectId,
      coordinates: L.GeoJSON.coordsToLatLngs(objectData.geometry.coordinates[0])
    };
  });
  return (
    <FeatureGroup>
      {formatObjects.map(object => (
        <Polygon key={object.id} id={object.id} positions={object.coordinates} color="red" />
      ))}
    </FeatureGroup>
  );
};

export default LayerTables;
