import React from 'react';
import { Spin } from 'antd';

import classes from './spinner.module.scss';

function Spinner() {
  return (
    <div className={classes.spinner}>
      <Spin size="large" />
    </div>
  );
}

export default Spinner;
