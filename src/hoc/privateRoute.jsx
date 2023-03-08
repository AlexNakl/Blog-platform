import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import paths from '../helpers/routesPaths';

function PrivateRoute() {
  const token = Cookies.get('auth-token');

  return token ? <Outlet /> : <Navigate to={`${paths.signIn}`} />;
}

export default PrivateRoute;
