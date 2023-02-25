import { GET_ARTICLE_SLUG } from '../actions';

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
    default:
      return state;
  }
};

export default articleSlugReducer;
