import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { Marker } from 'react-leaflet';

import './index.css';

const ObjectRobot = ({ robot: { position, markerColor } }) => (
  <Marker
    position={[position.y, position.x]}
    icon={L.divIcon({
      className: 'robot-map-point',
      html: `<i class="fas fa-bullseye" style="color:${markerColor}"></i>`
    })}
  />
);

ObjectRobot.propTypes = {
  robot: PropTypes.shape({
    position: PropTypes.shape({
      x: PropTypes.string.isRequired,
      y: PropTypes.string.isRequired
    }),
    markerColor: PropTypes.string
  })
};

ObjectRobot.defaultProps = {
  robot: {}
};

export default ObjectRobot;
