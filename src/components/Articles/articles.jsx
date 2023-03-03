/* eslint-disable indent */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'antd';
import Cookies from 'js-cookie';

import Spinner from '../Spinner';
import Paginator from '../Pagination';
import ArticlePreview from '../ArticlePreview';
import { getArticlesGlobally } from '../../redux/actionCreators';
import { getArticles, getUsePage, getPageSize, getIsLoading, getError } from '../../redux/selectors';

import classes from './articles.module.scss';

function Articles() {
  const articles = useSelector(getArticles);
  const usePage = useSelector(getUsePage);
  const pageSize = useSelector(getPageSize);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const dispatch = useDispatch();
  const authToken = Cookies.get('auth-token');

  useEffect(() => {
    dispatch(getArticlesGlobally(pageSize, usePage, authToken));
  }, [dispatch, usePage, pageSize]);

  const hasData = !(isLoading || error.active);

  return (
    <main className={classes.articles}>
      {isLoading && !error.active ? <Spinner size="large" /> : null}
      {error.active ? <Alert message="Error" description={error.message} type="error" showIcon /> : null}
      {hasData
        ? articles.map((article, index) => (
            <ArticlePreview
              key={article.slug}
              slug={article.slug}
              title={article.title}
              tagList={article.tagList}
              avatar={article.author.image}
              likes={article.favoritesCount}
              isFavorited={article.favorited}
              dateRelease={article.createdAt}
              description={article.description}
              userName={article.author.username}
              index={index}
            />
          ))
        : null}
      {hasData ? <Paginator /> : null}
    </main>
  );
}

export default Articles;
