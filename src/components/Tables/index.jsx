import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { Polygon } from 'react-leaflet';

const Tables = ({ objects, subToUpdate }) => {
  useEffect(() => {
    if (subToUpdate) {
      subToUpdate();
    }
  }, [subToUpdate]);

  const formatObjects = objects.map(({ id: objectId, data: objectData }) => ({
    id: objectId,
    coordinates: L.GeoJSON.coordsToLatLngs(objectData.geometry.coordinates[0])
  }));
  return formatObjects.map(object => (
    <Polygon key={object.id} id={object.id} positions={object.coordinates} color="red" />
  ));
};

Tables.propTypes = {
  objects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      data: PropTypes.object
    })
  ),
  subToUpdate: PropTypes.func
};

Tables.defaultProps = {
  objects: [],
  subToUpdate: null
};

export default Tables;
