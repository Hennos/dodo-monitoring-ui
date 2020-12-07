import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DataOperatorStatus from '../DataOperatorStatus';

import './index.css';

const ActiveOperatorStatus = ({ id, role, stylization }) => (
  <div className={classNames('active-operator-status', stylization)}>
    <DataOperatorStatus id={id}>
      {operator =>
        operator ? (
          <>
            <span>{operator.givenName}</span>
            <span>{operator.familyName}</span>
            {role === 'master' && <span className="fas fa-crown active-status-icon" />}
          </>
        ) : (
          <span>Получение...</span>
        )
      }
    </DataOperatorStatus>
  </div>
);

ActiveOperatorStatus.propTypes = {
  id: PropTypes.string.isRequired,
  role: PropTypes.string,
  stylization: PropTypes.string
};

ActiveOperatorStatus.defaultProps = {
  role: 'default',
  stylization: ''
};

export default ActiveOperatorStatus;
