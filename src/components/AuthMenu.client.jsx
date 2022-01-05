import _ from 'lodash';
import {useAuth0} from '@auth0/auth0-react';
import {useHistory, useLocation} from 'react-router-dom';

import shopifyConfig from '../../shopify.config';
const {siteDomain} = shopifyConfig;

export const shopRoute = '/shop';
export const productsRoute = '/shop/products';

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

  let history = useHistory();
  const {pathname} = useLocation();
  const shopUrl = siteDomain + shopRoute;
  const productsUrl = siteDomain + productsRoute;

  const LoginButton = () => {
    return (
      <button
        className="auth-menu__log-in-button"
        onClick={() => loginWithRedirect()}
      >
        Member Login
      </button>
    );
  };

  const LogoutButton = () => {
    return (
      <button
        className="auth-menu__log-out-button"
        onClick={() => logout({returnTo: shopUrl})}
      >
        Log Out
      </button>
    );
  };

  return (
    <div className="auth-menu">
      {!isLoading && isAuthenticated ? (
        <>
          <img
            className="auth-menu__avatar"
            src={user.picture}
            width="24"
            height="24"
          />
          <span className="auth-menu__username">{user.name}</span>
          <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
};

export default AuthMenu;

// export default withAuthenticationRequired(AuthMenu, {
//   onRedirecting: () => <Loading />,
// });
