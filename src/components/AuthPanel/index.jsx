import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { activeOperatorId, activeOperatorRole, activeRoomId } from '../../apollo/cache';

import './index.css';

const AuthPanel = ({ stylization }) => (
  <div className={classNames('auth-panel modal-theme', stylization)}>
    <div className="auth-form">
      <div className="auth-input">
        <p className="auth-input-title">Почта</p>
        <input className="auth-text-input" type="email" name="email" />
      </div>
      <div className="auth-input">
        <p className="auth-input-title">Пароль</p>
        <input className="auth-text-input" type="password" name="password" />
      </div>
      <div className="auth-submit">
        <input
          className="auth-submit-button"
          type="submit"
          onClick={() => {
            activeOperatorId('1');
            activeOperatorRole('master');
            activeRoomId('1');

            return false;
          }}
        />
      </div>
    </div>
  </div>
);

AuthPanel.propTypes = {
  stylization: PropTypes.string
};

AuthPanel.defaultProps = {
  stylization: ''
};

export default AuthPanel;
