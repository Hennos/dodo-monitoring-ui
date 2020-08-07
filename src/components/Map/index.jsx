import React, { useState } from 'react';
import L from 'leaflet';
import { Map as LeafletMap, ImageOverlay, LayersControl } from 'react-leaflet';

import './index.css';

import EditingControl from '../EditingControl';
import EditingLayer from '../EditingLayer';
import ViewLayers from '../ViewLayers';
import LayerRobots from '../LayerRobots';
import RobotsInformation from '../RobotsInformation';

// #region Transformation & CRS
function getFloorPlanTransformation({
  sizeRobotMap,
  sizeFloorPlan,
  robotMapOrigin,
  pixelMeterRobotMap
}) {
  const meterCoordinatesScale = sizeRobotMap
    .unscaleBy(sizeFloorPlan)
    .multiplyBy(pixelMeterRobotMap);
  return new L.Transformation(
    meterCoordinatesScale.x,
    robotMapOrigin.x,
    meterCoordinatesScale.y,
    robotMapOrigin.y
  );
}

// const floorHeight = 826;
// const floorWidth = 1156;

const sizeFloorPlan = L.point(1156, 826);
const sizeRobotMap = L.point(640, 384);
const pixelMeterRobotMap = 0.02;
const robotMapOrigin = L.point(0, 0);

const FloorPlanTransformation = getFloorPlanTransformation({
  sizeFloorPlan,
  sizeRobotMap,
  robotMapOrigin,
  pixelMeterRobotMap
});

const fromPixelToMeterPoint = point => FloorPlanTransformation.transform(point);
const fromMeterToPixelPoint = point => FloorPlanTransformation.untransform(point);

const meterSizeFloorPlan = fromPixelToMeterPoint(sizeFloorPlan);
const meterFloorPlanBounds = [
  [0, meterSizeFloorPlan.x],
  [-meterSizeFloorPlan.y, 0]
];

L.Projection.RobotCoordinates = L.extend({}, L.CRS.LonLag, {
  project: point => {
    return point ? fromMeterToPixelPoint(L.point(point.lng, point.lat)) : L.point(0, 0);
  },
  unproject: point => {
    const meterPoint = fromPixelToMeterPoint(point);
    return L.latLng([meterPoint.y, meterPoint.x]);
  }
});

L.CRS.Robot = L.extend({}, L.CRS.Simple, {
  projection: L.Projection.RobotCoordinates
});
// #endregion

const Map = () => {
  const [editing, setEditing] = useState(null);

  const floorCenter = meterSizeFloorPlan.divideBy(2);

  const { BaseLayer } = LayersControl;
  return (
    <LeafletMap
      id="root-map"
      maxBounds={meterFloorPlanBounds}
      center={floorCenter}
      zoom={0}
      zoomControl={false}
      crs={L.CRS.Robot}
      useFlyTo
    >
      <LayersControl position="topright" collapsed={false}>
        <BaseLayer checked name="План помещения">
          <ImageOverlay
            url={`http://${window.location.hostname}:15032/floor.jpg`}
            bounds={meterFloorPlanBounds}
          />
        </BaseLayer>
        <BaseLayer name="Карта робота">
          <ImageOverlay
            url={`http://${window.location.hostname}:15032/robot.jpg`}
            bounds={meterFloorPlanBounds}
          />
        </BaseLayer>
      </LayersControl>
      <EditingControl position="topright" editing={editing} onChoose={setEditing} />
      <RobotsInformation />
      {editing && <EditingLayer id={editing} />}
      <ViewLayers editing={editing} />
      <LayerRobots />
    </LeafletMap>
  );
};

export default Map;
