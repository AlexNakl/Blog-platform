import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Articles from '../Articles';
import Layout from '../Layout';
import Article from '../Article';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import EditProfile from '../EditProfile';
import CreateArticle from '../CreateArticle';
import { getCurrentlyUser } from '../../redux/actionCreators';
import ArticleFormContainer from '../../hoc/articleFormContainer';
import PrivateRoute from '../../hoc/privateRoute';
import NotFoundPage from '../NotFoundPage';
import paths from '../../helpers/routesPaths';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentlyUser());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Articles />} />
          <Route path={`${paths.articles}`} element={<Articles />} />
          <Route path={`${paths.articles}/:${paths.slug}`} element={<Article />} />
          <Route path={`${paths.signUp}`} element={<SignUp />} />
          <Route path={`${paths.signIn}`} element={<SignIn />} />
          <Route element={<PrivateRoute />}>
            <Route path={`${paths.profile}`} element={<EditProfile />} />
            <Route path={`${paths.newArticle}`} element={<CreateArticle />} />
            <Route path={`${paths.articles}/:${paths.slug}/${paths.edit}`} element={<ArticleFormContainer />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
