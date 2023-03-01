import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, useNavigate } from 'react-router-dom';

import { logOut, getImgProfileUser } from '../../redux/actionCreators';
import icon from '../../img/avatar.png';
import { getUser } from '../../redux/selectors';

import classes from './userHeader.module.scss';

function UserHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const imgSrc = user.image ? user.image : icon;

  useEffect(() => {
    dispatch(getImgProfileUser(user.username));
  }, [user.username]);

  const onClick = () => {
    dispatch(logOut(() => navigate('/', { replace: true })));
  };

  return (
    <header className={classes.header}>
      <Link className={classes.title} to="articles">
        Realworld Blog
      </Link>
      <div className={classes.btnsWrapper}>
        <NavLink to="new-article" className={({ isActive }) => (isActive ? classes.active : classes.createArticle)}>
          Create article
        </NavLink>
        <Link className={classes.userInfo} to="profile">
          <p className={classes.username}>{user.username}</p>
          <img src={imgSrc} alt="avatar" />
        </Link>
        <button type="button" onClick={onClick} className={classes.logOut}>
          Log Out
        </button>
      </div>
    </header>
  );
}

export default UserHeader;
