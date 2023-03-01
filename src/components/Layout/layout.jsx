import React from 'react';
import Cookies from 'js-cookie';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Spinner from '../Spinner';
import Header from '../Header';
import UserHeader from '../UserHeader';
import { getUser } from '../../redux/selectors';

import classes from './layout.module.scss';

function Layout() {
  const user = useSelector(getUser);
  const token = Cookies.get('auth-token');

  return (
    <div className={classes['Blog-platform']}>
      {token && !user ? <Spinner size="large" /> : null}
      {token && user ? <UserHeader /> : null}
      {!token && !user ? <Header /> : null}
      {token ? user && <Outlet /> : <Outlet />}
    </div>
  );
}

export default Layout;
