import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Articles from '../Articles';
import Layout from '../Layout';
import Article from '../Article';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import EditProfile from '../EditProfile';
import { getCurrentlyUser } from '../../redux/actionCreators';

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
          <Route path="articles" element={<Articles />} />
          <Route path="articles/:slug" element={<Article />} />
          <Route path=":slug" element={<Article />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
