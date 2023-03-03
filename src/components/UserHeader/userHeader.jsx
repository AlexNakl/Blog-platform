import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Popconfirm } from 'antd';

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

  const confirm = () => {
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
        <Popconfirm
          title="Log out"
          description="Are you sure you want to log out?"
          onConfirm={confirm}
          okText="Yes"
          cancelText="No"
        >
          <button type="button" className={classes.logOut}>
            Log Out
          </button>
        </Popconfirm>
      </div>
    </header>
  );
}

export default UserHeader;
