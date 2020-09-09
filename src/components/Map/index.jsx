import React from 'react';
import { Map as LeafletMap, ImageOverlay, ZoomControl } from 'react-leaflet';

import TablesEditingControl from '../TablesEditingControl';
import LayerTables from '../LayerTables';
import LayerRobots from '../LayerRobots';
import RobotsInformation from '../RobotsInformation';
import OrdersInformation from '../OrdersInformation';

import createMapConfiguration from './projection';

import './index.css';

const { bounds: mapBounds, crs } = createMapConfiguration(1, [1600, 1600], [0, 0], 0.05);

const Map = () => {
  const center = [0, 0];
  return (
    <LeafletMap id="root-map" center={center} zoom={0} crs={crs} zoomControl={false} useFlyTo>
      <ImageOverlay url="http://95.181.230.223:15032/robot.jpg" bounds={mapBounds} />
      <ZoomControl position="bottomright" />
      <TablesEditingControl position="topright" />
      <RobotsInformation position="topleft" />
      <OrdersInformation position="topleft" />
      <LayerTables />
      <LayerRobots />
    </LeafletMap>
  );
};

export default Map;
