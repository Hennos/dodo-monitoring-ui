import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';

import RobotDescriptor from '../RobotDescriptor';

import { GET_ROBOT_DESCRIPTION, SUBSCRIBE_ROBOT_POSITION } from './requests';

const RobotDescriptorWithData = ({ id, stylization }) => {
  const { subscribeToMore, ...result } = useQuery(GET_ROBOT_DESCRIPTION, { variables: { id } });

  if (result.loading || result.error) return null;

  const { robot } = result.data;
  return (
    <RobotDescriptor
      stylization={stylization}
      robot={robot}
      subToUpdate={() => {
        subscribeToMore({
          document: SUBSCRIBE_ROBOT_POSITION,
          variables: { id },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const { robot: updated } = subscriptionData.data;
            return {
              robot: { ...prev.robot, position: updated.position }
            };
          }
        });
      }}
    />
  );
};

RobotDescriptorWithData.propTypes = {
  id: PropTypes.string.isRequired,
  stylization: PropTypes.string
};

RobotDescriptorWithData.defaultProps = {
  stylization: ''
};

export default RobotDescriptorWithData;
