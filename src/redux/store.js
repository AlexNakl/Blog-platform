import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { articlesReducer, articleSlugReducer, statusReducer, userDataReducer } from './reducers';

const rootReducer = combineReducers({
  articles: articlesReducer,
  article: articleSlugReducer,
  status: statusReducer,
  userData: userDataReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
