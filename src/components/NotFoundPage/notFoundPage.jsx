import { Link } from 'react-router-dom';

import classes from './notFoundPage.module.scss';

function NotFoundPage() {
  return (
    <div className={classes['notFoundPage-wrapper']}>
      This page doesn`t exist. Go{' '}
      <Link to="/" className={classes.link}>
        Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
