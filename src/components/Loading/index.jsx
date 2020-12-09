import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.css';

const Loading = ({ stylization }) => (
  <div className={classNames('loading-bar', stylization)}>
    <div />
    <div />
    <div />
  </div>
);

Loading.propTypes = {
  stylization: PropTypes.string
};

Loading.defaultProps = {
  stylization: ''
};

export default Loading;
