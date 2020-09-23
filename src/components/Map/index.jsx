import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Map as LeafletMap, ImageOverlay, ZoomControl } from 'react-leaflet';

import TablesEditingControl from '../TablesEditingControl';
import LayerTables from '../LayerTables';
import LayerRobots from '../LayerRobots';
import RobotsInformation from '../RobotsInformation';
import OrdersInformation from '../OrdersInformation';

import createMapConfiguration from './projection';

import './index.css';

const Map = ({ config: { width, height, scale } }) => {
  const center = [0, 0];

  const { bounds: mapBounds, crs } = useMemo(
    () => createMapConfiguration(1, [width, height], center, scale),
    [center, width, height, scale]
  );

  return (
    <LeafletMap
      id="root-map"
      center={center}
      maxBounds={mapBounds}
      zoom={0}
      crs={crs}
      zoomControl={false}
      useFlyTo
    >
      <ImageOverlay url={`http://${window.location.hostname}:15032/mapImage`} bounds={mapBounds} />
      <ZoomControl position="bottomright" />
      <TablesEditingControl position="topright" />
      <RobotsInformation position="topleft" />
      <OrdersInformation position="topleft" />
      <LayerTables />
      <LayerRobots />
    </LeafletMap>
  );
};

Map.propTypes = {
  config: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    scale: PropTypes.number.isRequired
  }).isRequired
};

export default Map;
