import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '../Header';
import Articles from '../Articles';
// eslint-disable-next-line no-unused-vars
import Article from '../Article';

import classes from './app.module.scss';

function App() {
  return (
    <Router>
      <div className={classes['Blog-platform']}>
        <Header />
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<Article />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
