import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function PrivateRoute() {
  const token = Cookies.get('auth-token');

  return token ? <Outlet /> : <Navigate to="sign-in" />;
}

export default PrivateRoute;
