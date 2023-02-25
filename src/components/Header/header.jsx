import React from 'react';
import { Link } from 'react-router-dom';

import classes from './header.module.scss';

function Header() {
  return (
    <header className={classes.header}>
      <Link className={classes.title} to="/articles">
        Realworld Blog
      </Link>
      <div className={classes['btns-wrapper']}>
        <button className={`${classes.signIn} ${classes.active}`} type="button">
          Sign In
        </button>
        <button className={`${classes.signUp} ${classes.active}`} type="button">
          Sign Up
        </button>
      </div>
    </header>
  );
}

export default Header;
