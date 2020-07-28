import React, { useState } from 'react';
import L from 'leaflet';
import { Map as LeafletMap, ImageOverlay, LayersControl } from 'react-leaflet';

import './index.css';

// import Info from '../Info';
import EditingControl from '../EditingControl';
import EditingLayer from '../EditingLayer';
import ViewLayers from '../ViewLayers';

// #region Transformation & CRS
function getFloorPlanTransformation({ sizeRobotMap, sizeFloorPlan, pixelMeterRobotMap }) {
  const meterCoordinatesScale = sizeRobotMap
    .unscaleBy(sizeFloorPlan)
    .multiplyBy(pixelMeterRobotMap);
  return new L.Transformation(meterCoordinatesScale.x, 0, meterCoordinatesScale.y, 0);
}

// const floorHeight = 826;
// const floorWidth = 1156;

const sizeFloorPlan = L.point(1156, 826);
const sizeRobotMap = L.point(640, 384);
const pixelMeterRobotMap = 0.05;
const robotMapOrigin = L.point(1.51, 9.67);

const FloorPlanTransformation = getFloorPlanTransformation({
  sizeFloorPlan,
  sizeRobotMap,
  robotMapOrigin,
  pixelMeterRobotMap
});

const fromPixelToMeterPoint = point => FloorPlanTransformation.transform(point);
const fromMeterToPixelPoint = point => FloorPlanTransformation.untransform(point);

const meterLeftBottomBoundAngle = robotMapOrigin;
const meterRightTopBoundAngle = fromPixelToMeterPoint(sizeFloorPlan);
const meterFloorPlanBounds = [
  [-meterLeftBottomBoundAngle.x, -meterLeftBottomBoundAngle.y],
  [
    meterRightTopBoundAngle.x - meterLeftBottomBoundAngle.x,
    meterRightTopBoundAngle.y - meterLeftBottomBoundAngle.y
  ]
];

L.Projection.RobotCoordinates = L.extend({}, L.CRS.LonLag, {
  project: point => {
    return point ? fromMeterToPixelPoint(L.point(point.lat, point.lng)) : L.point(0, 0);
  },
  unproject: point => {
    const meterPoint = fromPixelToMeterPoint(point);
    return L.latLng([meterPoint.x, meterPoint.y]);
  }
});

L.CRS.Robot = L.extend({}, L.CRS.Simple, {
  projection: L.Projection.RobotCoordinates
});
// #endregion

const Map = () => {
  const [editing, setEditing] = useState(null);

  // const floorHeight = 826;
  // const floorWidth = 1156;
  // const floorBounds = [
  //   [0, 0],
  //   [floorHeight, floorWidth]
  // ];
  // const floorCenter = [floorHeight / 2, floorWidth / 2];

  const floorCenter = sizeFloorPlan.divideBy(2);

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
      {/* <Info className="info" /> */}
      <EditingControl position="topright" editing={editing} onChoose={setEditing} />
      {editing && <EditingLayer id={editing} />}
      <ViewLayers />
    </LeafletMap>
  );
};

export default Map;
