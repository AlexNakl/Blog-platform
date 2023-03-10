import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

import { formatDate, getIcon, shortenText } from '../../util/util';
import { favoritePreview, unfavoritePreview, changeNotFoundAvatarPreview } from '../../redux/actionCreators';
import paths from '../../helpers/routesPaths';
import notIcon from '../../img/notFound.png';

import classes from './articlePreview.module.scss';

function ArticlePreview({
  userName,
  avatar,
  title,
  likes,
  description,
  dateRelease,
  tagList,
  slug,
  isFavorited,
  index,
}) {
  const dispatch = useDispatch();
  const authToken = Cookies.get('auth-token');

  const onLiked = () => {
    if (isFavorited) {
      dispatch(unfavoritePreview(slug, index));
    } else {
      dispatch(favoritePreview(slug, index));
    }
  };

  const onErrorImg = () => {
    dispatch(changeNotFoundAvatarPreview(notIcon, index));
  };

  return (
    <article className={classes.articlePreview}>
      <div className={classes.mainInfo}>
        <div className={classes.articleInfo}>
          <div className={classes.titleAndBtn}>
            <Link className={classes.title} to={`/${paths.articles}/${slug}`}>
              {title === '' ? <>Article</> : shortenText(title, 150)}
            </Link>
            <button className={classes.likesBtn} type="button" onClick={onLiked} disabled={!authToken}>
              <img src={getIcon(isFavorited)} alt="" />
              {likes}
            </button>
          </div>
          <div className={classes.tags}>
            {tagList.map((tag, i) =>
              tag ? (
                <span key={`${slug}${tag}${i + 1}`} className={classes.tag}>
                  {shortenText(tag, 30)}
                </span>
              ) : null
            )}
          </div>
        </div>
        <div className={classes.userInfo}>
          <div>
            <p className={classes.userName}>{userName}</p>
            <p className={classes.dateRelease}>{formatDate(dateRelease)}</p>
          </div>
          <img className={classes.avatar} src={avatar} alt="avatar" onError={onErrorImg} />
        </div>
      </div>
      <p className={classes.description}>{shortenText(description, 500)}</p>
    </article>
  );
}

ArticlePreview.defaultProps = {
  index: 0,
  likes: 0,
  slug: '',
  title: '',
  avatar: '',
  tagList: [],
  userName: '',
  description: '',
  dateRelease: '',
  isFavorited: false,
};

ArticlePreview.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  likes: PropTypes.number,
  index: PropTypes.number,
  avatar: PropTypes.string,
  userName: PropTypes.string,
  isFavorited: PropTypes.bool,
  description: PropTypes.string,
  dateRelease: PropTypes.string,
  tagList: PropTypes.arrayOf(PropTypes.string),
};

export default ArticlePreview;
