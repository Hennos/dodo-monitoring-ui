import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useQuery } from '@apollo/react-hooks';

import { GET_PROCESSED_ROBOT } from './requests';

import './index.css';

const OrderProcessed = ({ stylization, id }) => {
  const { data, loading, error } = useQuery(GET_PROCESSED_ROBOT, { variables: { id } });

  if (loading || error) return <span className={classNames(stylization)}>неизвестно</span>;

  const { name: processed } = data.robot;
  return (
    <div className={classNames('order-processed-robot', stylization)}>
      {processed.length > 28 ? `${processed.slice(0, 28)}...` : processed}
    </div>
  );
};

OrderProcessed.propTypes = {
  id: PropTypes.string.isRequired,
  stylization: PropTypes.string
};

OrderProcessed.defaultProps = {
  stylization: ''
};

export default OrderProcessed;
