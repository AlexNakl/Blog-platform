import React from 'react';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';

import { formatDate, getIcon, shortenText } from '../../util/util';

import classes from './articlePreview.module.scss';

function ArticlePreview({ userName, avatar, title, likes, description, dateRelease, tagList, slug, isFavorited }) {
  return (
    <article className={classes.articlePreview}>
      <div className={classes.mainInfo}>
        <div className={classes.articleInfo}>
          <div className={classes.titleAndBtn}>
            <Link className={classes.title} to={`/articles/${slug}`}>
              {shortenText(title, 150)}
            </Link>
            <button onClick={() => {}} className={classes.likesBtn} type="button">
              <img src={getIcon(isFavorited)} alt="" />
              {likes}
            </button>
          </div>
          <div className={classes.tags}>
            {tagList.map((tag) => (
              <span key={uuid()} className={classes.tag}>
                {shortenText(tag, 30)}
              </span>
            ))}
          </div>
        </div>
        <div className={classes.userInfo}>
          <div>
            <p className={classes.userName}>{userName}</p>
            <p className={classes.dateRelease}>{formatDate(dateRelease)}</p>
          </div>
          <img className={classes.avatar} src={avatar} alt="avatar" />
        </div>
      </div>
      <p className={classes.description}>{shortenText(description, 500)}</p>
    </article>
  );
}

export default ArticlePreview;
