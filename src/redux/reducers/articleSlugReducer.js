import { GET_ARTICLE_SLUG, DELETE_ARTICLE } from '../actions';

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
    default:
      return state;
  }
};

export default articleSlugReducer;
