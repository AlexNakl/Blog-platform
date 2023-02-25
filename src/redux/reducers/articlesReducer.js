import { GET_ARTICLES_GLOBALLY, CHANGE_USE_PAGE, CHANGE_PAGE_SIZE } from '../actions';

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
    default:
      return state;
  }
};

export default articlesReducer;
