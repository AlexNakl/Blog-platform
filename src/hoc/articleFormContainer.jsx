import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import CreateArticle from '../components/CreateArticle';
import paths from '../helpers/routesPaths';

function ArticleFormContainer() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === `/${paths.newArticle}`) {
      navigate(`/${paths.newArticle}`);
    }
  }, [location.pathname, navigate]);

  return <CreateArticle />;
}

export default ArticleFormContainer;
