import {
  GET_ARTICLES_GLOBALLY,
  CHANGE_USE_PAGE,
  CHANGE_PAGE_SIZE,
  FAVORITE_PREVIEW,
  UNFAVORITE_PREVIEW,
} from '../actions';

const initialState = {
  articles: [],
  articlesCount: 0,
  usePage: 1,
  pageSize: 5,
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES_GLOBALLY:
      return { ...state, ...action.payload };
    case CHANGE_USE_PAGE:
      return { ...state, usePage: action.payload };
    case CHANGE_PAGE_SIZE:
      return { ...state, pageSize: action.payload };
    case FAVORITE_PREVIEW:
      // eslint-disable-next-line no-case-declarations
      const newArr = [...state.articles];
      newArr[action.payload.index] = action.payload.article;
      return { ...state, articles: newArr };
    case UNFAVORITE_PREVIEW:
      // eslint-disable-next-line no-case-declarations
      const newUnArr = [...state.articles];
      newUnArr[action.payload.index] = action.payload.article;
      return { ...state, articles: newUnArr };
    default:
      return state;
  }
};

export default articlesReducer;
