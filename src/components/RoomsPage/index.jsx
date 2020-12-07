import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import RoomsPanel from '../RoomsPanel';

import './index.css';

const RoomsPage = ({ stylization }) => {
  return (
    <div className={classNames('rooms-page', stylization)}>
      <RoomsPanel stylization="page-rooms-panel" />
    </div>
  );
};

RoomsPage.propTypes = {
  stylization: PropTypes.string
};

RoomsPage.defaultProps = {
  stylization: ''
};

export default RoomsPage;
