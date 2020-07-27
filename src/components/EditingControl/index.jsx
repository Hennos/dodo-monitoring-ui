import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useQuery } from '@apollo/react-hooks';
import Control from 'react-leaflet-control';

import { GET_LAYERS } from './requests';

import './index.css';

// const mapLayers = [
//   {
//     id: '1',
//     name: 'tables'
//   }
// ];

const EditingControl = ({ stylization, position, editing, onChoose }) => {
  const { data, loading, error } = useQuery(GET_LAYERS);

  if (loading || error) return null;

  const { mapLayers } = data;
  return (
    <Control position={position}>
      <div className={classNames('editing-control', 'leaflet-control-layers', stylization)}>
        <p className="editing-control-title">Редактируемый слой</p>
        <ul className="editing-control-items">
          {mapLayers.map(({ id, name }) => {
            const isEditing = Object.is(id, editing);
            return (
              <button
                key={id}
                className="items-elem"
                type="button"
                onClick={() => onChoose(isEditing ? null : id)}
              >
                <input
                  type="radio"
                  checked={isEditing}
                  readOnly
                  className="leaflet-control-layers-selector"
                />
                <span className="items-elem-span">{name}</span>
              </button>
            );
          })}
        </ul>
      </div>
    </Control>
  );
};

EditingControl.propTypes = {
  stylization: PropTypes.string,
  position: PropTypes.string,
  editing: PropTypes.string,
  onChoose: PropTypes.func
};

EditingControl.defaultProps = {
  stylization: '',
  position: 'topleft',
  editing: null,
  onChoose: () => {}
};

export default EditingControl;
