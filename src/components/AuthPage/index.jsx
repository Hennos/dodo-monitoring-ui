import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import AuthPanel from '../AuthPanel';

import './index.css';

const AuthPage = ({ stylization }) => (
  <div className={classNames('auth-page', stylization)}>
    <AuthPanel />
  </div>
);

AuthPage.propTypes = {
  stylization: PropTypes.string
};

AuthPage.defaultProps = {
  stylization: ''
};

export default AuthPage;
