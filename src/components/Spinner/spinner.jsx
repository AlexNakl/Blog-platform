import React from 'react';
import { Spin } from 'antd';

import classes from './spinner.module.scss';

function Spinner({ size }) {
  return (
    <div className={classes.spinner}>
      <Spin size={size} />
    </div>
  );
}

export default Spinner;
