import { Alert, Popconfirm } from 'antd';
import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import Spinner from '../Spinner';
import { formatDate, getIcon } from '../../util/util';
import {
  getArticleSlug,
  deleteArticle,
  favorite,
  unfavorite,
  changeNotFoundAvatarArticle,
} from '../../redux/actionCreators';
import { getArticle, getIsLoading, getError, getUser } from '../../redux/selectors';
import paths from '../../helpers/routesPaths';
import notIcon from '../../img/notFound.png';

import classes from './article.module.scss';

function Article() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const article = useSelector(getArticle);
  const user = useSelector(getUser);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const hasData = !(isLoading || error.active);
  const authToken = Cookies.get('auth-token');
  const confirm = () => {
    dispatch(deleteArticle(slug, () => navigate('/', { replace: true })));
  };

  useEffect(() => {
    dispatch(getArticleSlug(slug, authToken));
  }, [dispatch]);

  const onLiked = () => {
    if (article.favorited) {
      dispatch(unfavorite(slug));
    } else {
      dispatch(favorite(slug));
    }
  };

  const onErrorImg = () => {
    dispatch(changeNotFoundAvatarArticle(notIcon));
  };

  return (
    <main className={classes.main}>
      {isLoading && !error.active ? <Spinner size="large" /> : null}
      {error.active ? <Alert message="Error" description={error.message} type="error" showIcon /> : null}
      {hasData ? (
        <article className={classes.article}>
          <div className={classes.mainInfo}>
            <div className={classes.articleInfo}>
              <div className={classes.titleAndBtn}>
                <h2 className={classes.title}>{article.title}</h2>
                <button className={classes.likesBtn} type="button" onClick={onLiked} disabled={!authToken}>
                  <img src={getIcon(article.favorited)} alt="" />
                  {article.favoritesCount}
                </button>
              </div>
              <div className={classes.tags}>
                {article.tagList.map((tag, i) =>
                  tag ? (
                    <span key={`${slug}${tag}${i + 1}`} className={classes.tag}>
                      {tag}
                    </span>
                  ) : null
                )}
              </div>
            </div>
            <div className={classes.userInfo}>
              <div>
                <p className={classes.userName}>{article.author.username}</p>
                <p className={classes.dateRelease}>{formatDate(article.createdAt)}</p>
              </div>
              <img className={classes.avatar} src={article.author.image} alt="avatar" onError={onErrorImg} />
            </div>
          </div>
          <div className={classes.descriptionWrapper}>
            <p className={classes.description}>{article.description}</p>
            {article.author.username === user?.username ? (
              <div className={classes.buttons}>
                <Popconfirm
                  title="Delete the article"
                  description="Are you sure to delete this article?"
                  onConfirm={confirm}
                  okText="Yes"
                  cancelText="No"
                >
                  <button type="button" className={classes.btnDelete}>
                    Delete
                  </button>
                </Popconfirm>
                <Link to={`/${paths.articles}/${slug}/${paths.edit}`} state={article} className={classes.btnEdit}>
                  Edit
                </Link>
              </div>
            ) : null}
          </div>
          <ReactMarkdown className={classes.markdown}>{article.body}</ReactMarkdown>
        </article>
      ) : null}
    </main>
  );
}

export default Article;
