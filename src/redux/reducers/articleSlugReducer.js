import { GET_ARTICLE_SLUG, DELETE_ARTICLE, FAVORITE, UNFAVORITE, PUT_NOT_FOUND_AVATAR_ARTICLE } from '../actions';

const initialState = {
  article: {
    slug: '',
    title: '',
    description: '',
    body: '',
    createdAt: '',
    updatedAt: '',
    tagList: [],
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      image: '',
      following: false,
    },
  },
};

const articleSlugReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLE_SLUG:
      return { ...state, ...action.payload };
    case DELETE_ARTICLE:
      return { ...state, article: initialState.article };
    case FAVORITE:
      return { ...state, article: action.payload };
    case UNFAVORITE:
      return { ...state, article: action.payload };
    case PUT_NOT_FOUND_AVATAR_ARTICLE:
      return { ...state, article: { ...state.article, author: { ...state.article.author, image: action.payload } } };
    default:
      return state;
  }
};

export default articleSlugReducer;
