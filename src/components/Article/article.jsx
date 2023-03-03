import { Alert, Popconfirm } from 'antd';
import { v4 as uuid } from 'uuid';
import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';

import Spinner from '../Spinner';
import { formatDate, getIcon } from '../../util/util';
import { getArticleSlug, deleteArticle } from '../../redux/actionCreators';
import { getArticle, getIsLoading, getError, getUser } from '../../redux/selectors';

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
  const confirm = () => {
    dispatch(deleteArticle(slug, () => navigate('/', { replace: true })));
  };

  useEffect(() => {
    dispatch(getArticleSlug(slug));
  }, [dispatch]);

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
                <button className={classes.likesBtn} type="button">
                  <img src={getIcon()} alt="" />
                  {article.favoritesCount}
                </button>
              </div>
              <div className={classes.tags}>
                {article.tagList.map((tag) =>
                  tag ? (
                    <span key={uuid()} className={classes.tag}>
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
              <img className={classes.avatar} src={article.author.image} alt="avatar" />
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
                <Link to={`/articles/${slug}/edit`} state={article} className={classes.btnEdit}>
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
