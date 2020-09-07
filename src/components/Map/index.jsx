import React from 'react';
import { Map as LeafletMap, ImageOverlay } from 'react-leaflet';

import TablesEditingControl from '../TablesEditingControl';
import LayerTables from '../LayerTables';
import LayerRobots from '../LayerRobots';
import RobotsInformation from '../RobotsInformation';
import OrdersInformation from '../OrdersInformation';

import createMapConfiguration from './projection';

import './index.css';

const { bounds, crs, center } = createMapConfiguration(2, [608, 384], [-10, 9], 0.05);

const Map = () => {
  return (
    <LeafletMap
      id="root-map"
      maxBounds={bounds}
      center={center}
      zoom={0}
      zoomControl={false}
      crs={crs}
      useFlyTo
    >
      <ImageOverlay url={`http://${window.location.hostname}:15032/robot.jpg`} bounds={bounds} />
      <TablesEditingControl position="topright" />
      <RobotsInformation position="topleft" />
      <OrdersInformation position="topleft" />
      <LayerTables />
      <LayerRobots />
    </LeafletMap>
  );
};

export default Map;
