import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import EditableLayerService from '../EditableLayerService';

const EditingTables = ({ children }) => {
  const tablesObjectsGroup = useMemo(() => children(), [children]);
  return (
    <EditableLayerService
      layer="1"
      options={{
        draw: {
          polygon: true,
          rectangle: false,
          polyline: false,
          circle: false,
          circlemarker: false,
          marker: false
        },
        collapsed: false
      }}
    >
      {tablesObjectsGroup}
    </EditableLayerService>
  );
};

EditingTables.propTypes = {
  children: PropTypes.func.isRequired
};

export default EditingTables;
