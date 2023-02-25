import { Alert } from 'antd';
import { v4 as uuid } from 'uuid';
import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Spinner from '../Spinner';
import { formatDate, getIcon } from '../../util/util';
import { getArticleSlug } from '../../redux/actionCreators';
import { getArticle, getIsLoading, getError } from '../../redux/selectors';

import classes from './article.module.scss';

function Article() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const article = useSelector(getArticle);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(getArticleSlug(slug));
  }, [dispatch]);

  const hasData = !(isLoading || error.active);

  return (
    <main className={classes.main}>
      {isLoading && !error.active ? <Spinner /> : null}
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
                {article.tagList.map((tag) => (
                  <span key={uuid()} className={classes.tag}>
                    {tag}
                  </span>
                ))}
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
            {true ? (
              <div className={classes.buttons}>
                <button type="button" className={classes.btnDelete}>
                  Delete
                </button>
                <button type="button" className={classes.btnEdit}>
                  Edit
                </button>
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
