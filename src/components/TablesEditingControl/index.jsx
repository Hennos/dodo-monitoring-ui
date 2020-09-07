import React from 'react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Control from 'react-leaflet-control';

import { tablesEditingStatus as setEditingStatus } from '../../apollo/cache';

import { GET_EDITING_STATUS } from './requests';

import './index.css';

const TablesEditingControl = ({ stylization, position }) => {
  const { data, loading, error } = useQuery(GET_EDITING_STATUS);

  if (loading || error) return null;

  const { status } = data;
  return (
    <Control position={position}>
      <div className={classNames('editing-tables-control', 'leaflet-control-layers', stylization)}>
        <button className="control-button" type="button" onClick={() => setEditingStatus(!status)}>
          <span>Редактировать столы</span>
          <i className={classNames('fas fa-edit', status && 'control-icon-focus')} />
        </button>
      </div>
    </Control>
  );
};

TablesEditingControl.propTypes = {
  stylization: PropTypes.string,
  position: PropTypes.string
};

TablesEditingControl.defaultProps = {
  stylization: '',
  position: 'topleft'
};

export default TablesEditingControl;
