import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useQuery } from '@apollo/client';
import Control from 'react-leaflet-control';

import Button from '../Button';
import OrderDescription from '../OrderDescription';

import { GET_ORDERS_LIST, SUBSCRIBE_ORDERS_STATUS_LIST } from './requests';

import './index.css';

const OrdersInformation = ({ position, stylization }) => {
  const [collapsed, setCollapse] = useState(false);
  const { subscribeToMore, ...result } = useQuery(GET_ORDERS_LIST);

  useEffect(() => {
    subscribeToMore({
      document: SUBSCRIBE_ORDERS_STATUS_LIST,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { orders } = subscriptionData.data;
        return {
          orders
        };
      }
    });
  }, [subscribeToMore]);

  if (result.loading || result.error) return null;

  const orders = result.data.orders
    .map((order, index) => ({ ...order, number: index + 1 }))
    .reverse()
    .slice(0, 10);
  return (
    <Control position={position}>
      <div className={classNames('orders-information leaflet-control-layers', stylization)}>
        {collapsed ? (
          <div className="orders-info-collapsed">
            <div className="orders-info-title">
              <span>Список заказов</span>
              <Button name="open" stylization="control-button" onClick={() => setCollapse(false)}>
                <i className="fas fa-chevron-down" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="orders-info-full">
            <div className="orders-info-title">
              <span>Список заказов</span>
              <Button name="close" stylization="control-button" onClick={() => setCollapse(true)}>
                <i className="fas fa-times" />
              </Button>
            </div>
            <div className="orders-description-list">
              {orders.map(({ id, number }) => (
                <div key={id} className="description-row">
                  <OrderDescription id={id} number={number} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Control>
  );
};

OrdersInformation.propTypes = {
  position: PropTypes.string,
  stylization: PropTypes.string
};

OrdersInformation.defaultProps = {
  position: 'topleft',
  stylization: ''
};

export default OrdersInformation;
