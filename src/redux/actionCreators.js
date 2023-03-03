/* eslint-disable no-console */
import Cookies from 'js-cookie';

import BlogApiServices from '../services/BlogApiServices';
import BlogApiSessionServices from '../services/BlogApiSessionServices';

import {
  GET_ARTICLES_GLOBALLY,
  CHANGE_USE_PAGE,
  CHANGE_PAGE_SIZE,
  TOGGLE_LOADING,
  ERROR_STATUS,
  GET_ARTICLE_SLUG,
  PUT_REG_ERROR,
  REGISTRATION,
  LOG_OUT,
  PUT_IMG_USER,
  DELETE_ARTICLE,
} from './actions';

const BlogApi = new BlogApiServices();
const BlogApiSession = new BlogApiSessionServices();

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
    dispatch(toggleLoading(false));
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
    dispatch(toggleLoading(false));
  }
};

export const createArticle = (articleData, cb) => async (dispatch) => {
  dispatch(toggleLoading(true));
  dispatch(updateError({ active: false, message: '' }));
  dispatch({ type: PUT_REG_ERROR, payload: null });
  try {
    const authToken = Cookies.get('auth-token');
    await BlogApiSession.createArticle(authToken, articleData);
    cb();
  } catch (err) {
    console.error(err, err.message);
    dispatch(updateError({ active: true, message: `${err.message}` }));
    dispatch(toggleLoading(false));
  }
};

export const deleteArticle = (slug, cb) => async (dispatch) => {
  dispatch(toggleLoading(true));
  dispatch(updateError({ active: false, message: '' }));
  dispatch({ type: PUT_REG_ERROR, payload: null });
  try {
    const authToken = Cookies.get('auth-token');
    await BlogApiSession.deleteArticle(authToken, slug);
    cb();
    dispatch({ type: DELETE_ARTICLE });
  } catch (err) {
    console.error(err, err.message);
    dispatch(updateError({ active: true, message: `${err.message}` }));
    dispatch(toggleLoading(false));
  }
};

export const editArticle = (editData, slug, cb) => async (dispatch) => {
  dispatch(toggleLoading(true));
  dispatch(updateError({ active: false, message: '' }));
  dispatch({ type: PUT_REG_ERROR, payload: null });
  try {
    const authToken = Cookies.get('auth-token');
    await BlogApiSession.editArticle(authToken, slug, editData);
    cb();
    dispatch({ type: DELETE_ARTICLE });
  } catch (err) {
    console.error(err, err.message);
    dispatch(updateError({ active: true, message: `${err.message}` }));
    dispatch(toggleLoading(false));
  }
};

// UserData
export const registration = (data, cb) => async (dispatch) => {
  dispatch(toggleLoading(true));
  dispatch(updateError({ active: false, message: '' }));
  dispatch({ type: PUT_REG_ERROR, payload: null });
  try {
    const { userName, email, password } = data;
    const res = await BlogApiSession.registerNewUser({ username: userName, email, password });

    if (res.errors) {
      dispatch({ type: PUT_REG_ERROR, payload: res.errors });
      dispatch(toggleLoading(false));
    } else {
      const user = await BlogApiSession.login({ email, password });
      cb();
      Cookies.set('auth-token', user.user.token, { expires: 30 });
      dispatch({ type: REGISTRATION, payload: user.user });
      dispatch(toggleLoading(false));
    }
  } catch (err) {
    console.error(err, err.message);
    dispatch(updateError({ active: true, message: `${err.message}` }));
    dispatch(toggleLoading(false));
  }
};

export const login = (data, cb) => async (dispatch) => {
  dispatch(toggleLoading(true));
  dispatch(updateError({ active: false, message: '' }));
  dispatch({ type: PUT_REG_ERROR, payload: null });
  try {
    const { email, password } = data;
    const res = await BlogApiSession.login({ email, password });

    if (res.errors) {
      dispatch({ type: PUT_REG_ERROR, payload: res.errors });
      dispatch(toggleLoading(false));
    } else {
      cb();
      Cookies.set('auth-token', res.user.token, { expires: 30 });
      dispatch({ type: REGISTRATION, payload: res.user });
      dispatch(toggleLoading(false));
    }
  } catch (err) {
    console.error(err, err.message);
    dispatch(updateError({ active: true, message: `${err.message}` }));
    dispatch(toggleLoading(false));
  }
};

export const getCurrentlyUser = () => async (dispatch) => {
  try {
    const authToken = Cookies.get('auth-token');

    if (authToken) {
      const res = await BlogApiSession.getCurrentlyUser(authToken);

      if (res.errors) {
        Cookies.remove('auth-token');
        dispatch({ type: LOG_OUT });
      } else {
        dispatch({ type: REGISTRATION, payload: res.user });
      }
    }
  } catch (err) {
    console.error(err, err.message);
    dispatch(updateError({ active: true, message: `${err.message}` }));
  }
};

export const getImgProfileUser = (userName) => async (dispatch) => {
  try {
    const res = await BlogApi.getProfileUser(userName);
    dispatch({ type: PUT_IMG_USER, payload: res.profile.image });
  } catch (err) {
    console.error(err, err.message);
    dispatch(updateError({ active: true, message: `${err.message}` }));
  }
};

export const logOut = (cb) => async (dispatch) => {
  Cookies.remove('auth-token');
  dispatch({ type: LOG_OUT });
  cb();
  dispatch(getArticlesGlobally());
};

export const editProfile = (newUserData, cb) => async (dispatch) => {
  dispatch(toggleLoading(true));
  dispatch(updateError({ active: false, message: '' }));
  dispatch({ type: PUT_REG_ERROR, payload: null });
  try {
    const authToken = Cookies.get('auth-token');
    const newData = { ...newUserData };

    Object.keys(newData).forEach((key) => {
      if (newData[key] === '') {
        delete newData[key];
      }
      if (key === 'userName') {
        newData.username = newData[key];
        delete newData[key];
      }
    });

    const res = await BlogApiSession.editProfileUser(authToken, newData);

    if (res.errors) {
      dispatch({ type: PUT_REG_ERROR, payload: res.errors });
      dispatch(toggleLoading(false));
    } else {
      dispatch(getCurrentlyUser());
      dispatch(getImgProfileUser(res.user.username));
      cb();
      dispatch(toggleLoading(false));
    }
  } catch (err) {
    console.error(err, err.message);
    dispatch(updateError({ active: true, message: `${err.message}` }));
    dispatch(toggleLoading(false));
  }
};
