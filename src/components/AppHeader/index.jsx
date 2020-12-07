import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import UserStatus from '../UserStatus';

import './index.css';

const AppHeader = ({ stylization }) => (
  <div className={classNames('app-header-info', stylization)}>
    <UserStatus stylization="app-user-status" />
  </div>
);

AppHeader.propTypes = {
  stylization: PropTypes.string
};

AppHeader.defaultProps = {
  stylization: ''
};

export default AppHeader;
