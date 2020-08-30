import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useQuery } from '@apollo/react-hooks';

import { GET_ORDER_DESCRIPTION, SUBSCRIBE_ORDER_STATUS } from './requests';

import './index.css';

const orderStatusEnum = {
  ORDER_ACCEPTED: 1,
  ORDER_COOKING: 2,
  ORDER_READY: 3,
  ORDER_DELIVERY: 4,
  ORDER_DELIVERED: 5
};

const statusMessages = new Map([
  [orderStatusEnum.ORDER_ACCEPTED, 'заказ принят'],
  [orderStatusEnum.ORDER_COOKING, 'заказ готовится'],
  [orderStatusEnum.ORDER_READY, 'заказ готов'],
  [orderStatusEnum.ORDER_DELIVERY, 'заказ доставляется'],
  [orderStatusEnum.ORDER_DELIVERED, 'заказ доставлен']
]);

const OrderDescription = ({ stylization, id, number }) => {
  const { subscribeToMore, ...result } = useQuery(GET_ORDER_DESCRIPTION, {
    variables: { id }
  });

  useEffect(() => {
    subscribeToMore({
      document: SUBSCRIBE_ORDER_STATUS,
      variables: { id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { order } = subscriptionData.data;
        return {
          order: {
            ...prev.order,
            status: order.status
          }
        };
      }
    });
  }, [id, subscribeToMore]);

  if (result.loading || result.error) return null;

  const { order } = result.data;
  return (
    <div className={classNames('order-descriptor', stylization)}>
      <div className="order-number">{number}</div>
      <div className="order-time">19:38:24</div>
      <div className="order-status">{order.status && statusMessages.get(order.status)}</div>
    </div>
  );
};

OrderDescription.propTypes = {
  id: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  stylization: PropTypes.string
};

OrderDescription.defaultProps = {
  stylization: ''
};

export default OrderDescription;
