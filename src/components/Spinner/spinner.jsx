import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types';

import classes from './spinner.module.scss';

function Spinner({ size }) {
  return (
    <div className={classes.spinner}>
      <Spin size={size} />
    </div>
  );
}

Spinner.defaultProps = {
  size: '',
};

Spinner.propTypes = {
  size: PropTypes.string,
};

export default Spinner;
