import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';

import ObjectRobot from '../ObjectRobot';

import { GET_ROBOT_WITH_POSITION, SUBSCRIBE_ROBOT_POSITION } from './requests';

const ObjectRobotWithData = ({ id, ...props }) => {
  const { subscribeToMore, ...result } = useQuery(GET_ROBOT_WITH_POSITION, { variables: { id } });

  if (result.loading || result.error) return null;

  const { robot } = result.data;
  return (
    robot.position && (
      <ObjectRobot
        {...props}
        {...robot}
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
    )
  );
};

ObjectRobotWithData.propTypes = {
  id: PropTypes.string.isRequired
};

export default ObjectRobotWithData;
