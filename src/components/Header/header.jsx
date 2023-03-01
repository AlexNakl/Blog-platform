import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import classes from './header.module.scss';

function Header() {
  return (
    <header className={classes.header}>
      <Link className={classes.title} to="articles">
        Realworld Blog
      </Link>
      <div className={classes['btns-wrapper']}>
        <NavLink to="sign-in" className={({ isActive }) => (isActive ? classes.active : classes.signIn)}>
          Sign In
        </NavLink>
        <NavLink to="sign-up" className={({ isActive }) => (isActive ? classes.active : classes.signUp)}>
          Sign Up
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
