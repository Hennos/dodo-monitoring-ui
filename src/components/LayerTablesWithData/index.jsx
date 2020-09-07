import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';

import Tables from '../Tables';

import { GET_LAYER, SUBSCRIBE_LAYER_UPDATE } from './requests';

const LayerTablesWithData = ({ update }) => {
  const { subscribeToMore, ...result } = useQuery(GET_LAYER, { variables: { id: '1' } });

  if (result.loading || result.error) return null;

  const { layer } = result.data;
  return update ? (
    <Tables
      {...layer}
      subToUpdate={() => {
        subscribeToMore({
          document: SUBSCRIBE_LAYER_UPDATE,
          variables: { id: '1' },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            return { layer: subscriptionData.data.layer };
          }
        });
      }}
    />
  ) : (
    <Tables {...layer} />
  );
};

LayerTablesWithData.propTypes = {
  update: PropTypes.bool.isRequired
};

export default LayerTablesWithData;
