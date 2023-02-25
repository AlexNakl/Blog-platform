import BlogApiServices from '../services/BlogApiServices';

import {
  GET_ARTICLES_GLOBALLY,
  CHANGE_USE_PAGE,
  CHANGE_PAGE_SIZE,
  TOGGLE_LOADING,
  ERROR_STATUS,
  GET_ARTICLE_SLUG,
} from './actions';

const BlogApi = new BlogApiServices();

// Status
export const toggleLoading = (isLoading) => ({ type: TOGGLE_LOADING, payload: isLoading });
export const updateError = (error) => ({ type: ERROR_STATUS, payload: error });

// Articles
export const changeUsePage = (usePage) => ({ type: CHANGE_USE_PAGE, payload: usePage });
export const changePageSize = (current, pageSize) => ({ type: CHANGE_PAGE_SIZE, payload: pageSize });
export const getArticlesGlobally = (limit, offset) => async (dispatch) => {
  dispatch(toggleLoading(true));
  dispatch(updateError({ active: false, message: '' }));
  try {
    const response = await BlogApi.getArticlesGlobally(limit, offset > 1 ? offset * limit - limit : 0);
    dispatch({ type: GET_ARTICLES_GLOBALLY, payload: response });
    dispatch(toggleLoading(false));
  } catch (err) {
    console.error(err, err.message);
    dispatch(updateError({ active: true, message: `${err.message}` }));
  }
};

// Article
export const getArticleSlug = (slug) => async (dispatch) => {
  dispatch(toggleLoading(true));
  dispatch(updateError({ active: false, message: '' }));
  try {
    const response = await BlogApi.getArticle(slug);
    dispatch({ type: GET_ARTICLE_SLUG, payload: response });
    dispatch(toggleLoading(false));
  } catch (err) {
    console.error(err, err.message);
    dispatch(updateError({ active: true, message: `${err.message}` }));
  }
};
