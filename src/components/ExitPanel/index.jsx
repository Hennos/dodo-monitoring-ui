import React, { useState, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { activeOperatorId, activeOperatorRole, activeRoomId } from '../../apollo/cache';

import Button from '../Button';

import { GET_AUTH_STATUS } from './requests';

import './index.css';

const ExitPanel = ({ stylization }) => {
  const [showOptions, setViewOptions] = useState(false);
  const { data, loading, error } = useQuery(GET_AUTH_STATUS);

  const changeViewOptions = useCallback(() => setViewOptions(!showOptions), [showOptions]);

  if (loading || error) return null;

  const { authOperatorId, enterRoomId } = data;
  return (
    <div className={classNames('exit-panel', stylization)}>
      <Button
        stylization={classNames('exit-panel-switch', showOptions && 'exit-panel-switch-show')}
        onClick={changeViewOptions}
      >
        <span className="fas fa-cogs" />
      </Button>
      {showOptions && (
        <div className="exit-panel-options">
          {!!enterRoomId && (
            <ul className="room-options-list">
              <Button
                stylization="row-option"
                onClick={() => {
                  activeRoomId(null);
                  setViewOptions(false);
                }}
              >
                Выйти из комнаты
              </Button>
            </ul>
          )}
          {!!authOperatorId && (
            <ul className="user-options-list">
              <Button
                stylization="row-option"
                onClick={() => {
                  activeOperatorId(null);
                  activeOperatorRole(null);
                  activeRoomId(null);
                  setViewOptions(false);
                }}
              >
                Выйти
              </Button>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

ExitPanel.propTypes = {
  stylization: PropTypes.string
};

ExitPanel.defaultProps = {
  stylization: ''
};

export default ExitPanel;
