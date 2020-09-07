import React from 'react';
import { useQuery } from '@apollo/client';
import { FeatureGroup } from 'react-leaflet';

import EditingTables from '../EditingTables';
import LayerTablesWithData from '../LayerTablesWithData';

import { GET_TABLES_EDITING_STATUS } from './requests';

const LayerTables = () => {
  const { data } = useQuery(GET_TABLES_EDITING_STATUS);

  const { editing } = data;
  return (
    <FeatureGroup>
      {editing ? (
        <EditingTables>{() => <LayerTablesWithData update={false} />}</EditingTables>
      ) : (
        <LayerTablesWithData update />
      )}
    </FeatureGroup>
  );
};

export default LayerTables;
