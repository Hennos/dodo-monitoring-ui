import L from 'leaflet';

function getTransformation({ scale, origin, ratio }) {
  return new L.Transformation(ratio / scale, origin.x, ratio / scale, origin.y);
}

function configurate(mapScale, mapSize, mapOrigin, pixelMeterRatio) {
  const transformation = getTransformation({
    scale: mapScale,
    origin: mapOrigin,
    ratio: pixelMeterRatio
  });

  const toMeterPoint = point => transformation.transform(point);
  const toPixelPoint = point => transformation.untransform(point);

  const meterMapSize = toMeterPoint(mapSize);
  const topLeftAnglePoint = [-meterMapSize.x / 2, -meterMapSize.y / 2];
  const bottomRightAnglePoint = [meterMapSize.y / 2, meterMapSize.y / 2];

  const bounds = [topLeftAnglePoint, bottomRightAnglePoint];

  const projection = L.extend({}, L.CRS.LonLag, {
    project: point => {
      return point ? toPixelPoint(L.point(point.lng, point.lat)) : L.point(0, 0);
    },
    unproject: point => {
      const meterPoint = toMeterPoint(point);
      return L.latLng([meterPoint.y, meterPoint.x]);
    }
  });

  const crs = L.extend({}, L.CRS.Simple, { projection });

  return { projection, crs, bounds };
}

export default function(mapScale, mapSize, mapOrigin, pixelMeterRatio) {
  return configurate(
    mapScale,
    L.point(mapSize[0], mapSize[1]),
    L.point(mapOrigin[0], mapOrigin[1]),
    pixelMeterRatio
  );
}
