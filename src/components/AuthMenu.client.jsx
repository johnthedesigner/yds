import _ from 'lodash';
import {useAuth0} from '@auth0/auth0-react';
import {useHistory, useLocation} from 'react-router-dom';

export const shopRoute = '/shop';

export const isShopHomepage = () => {
  let {pathname} = useLocation();
  return pathname === shopRoute;
};

export const isShopPage = () => {
  let {pathname} = useLocation();
  return _.includes(pathname, shopRoute);
};

export const Loading = () => {
  return <h1>Loading...</h1>;
};

const AuthMenu = () => {
  const {loginWithRedirect, logout, user, isAuthenticated, isLoading} =
    useAuth0();
  // const {name, picture, email} = user;
  let history = useHistory();
  const {pathname} = useLocation();
  const shopUrl = 'http://localhost:3000' + shopRoute;

  const LoginButton = () => {
    return <button onClick={() => loginWithRedirect()}>Log In</button>;
  };

  const LogoutButton = () => {
    return <button onClick={() => logout({returnTo: shopUrl})}>Log Out</button>;
  };

  return (
    <div className="auth-menu">
      {isLoading || !isAuthenticated ? (
        <LoginButton />
      ) : (
        <>
          <img src={user.picture} width="16" height="16" />
          {user.name}
          <LogoutButton />
        </>
      )}
    </div>
  );
};

export default AuthMenu;

// export default withAuthenticationRequired(AuthMenu, {
//   onRedirecting: () => <Loading />,
// });
