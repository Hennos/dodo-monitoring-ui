import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useQuery } from '@apollo/react-hooks';

import { GET_LAYERS_STATE } from './requests';

import css from './index.module.css';

const Info = ({ className }) => {
  const { data, loading, error } = useQuery(GET_LAYERS_STATE);

  if (loading || error) return null;

  const {
    orderInfo: {
      name = 'loading...',
      batteryCharge = 'loading...',
      lastActivity = 'loading...',
      orderData: {
        tableNumber = 'loading...',
        orderNumber = 'loading...',
        orderDescription = 'loading...'
      } = {}
    }
  } = data.layers[0];

  return (
    <div className={className}>
      <div className={css.robot}>
        <div>
          <span className={css.robotName}>{name}</span>
        </div>
        <div className={css.robotInfo}>
          <div className={css.charge}>
            Заряд батареи
            {` ${batteryCharge}`}
          </div>
          <div className={css.lastActivity}>Последняя активность {lastActivity}</div>
        </div>
        <div className={css.case}>
          <span className={css.orderInfo}>Данные о заказе</span>
          <div className={css.caseInfo}>
            <div className={css.caseTitle}>Заказ № {orderNumber}</div>
            <div className={css.caseTable}>Стол № {tableNumber}</div>
            <div className={css.description}>{orderDescription}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

Info.propTypes = {
  className: PropTypes.string
};

Info.defaultProps = {
  className: ''
};

export default Info;
