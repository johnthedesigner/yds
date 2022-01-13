import {useAuth0} from '@auth0/auth0-react';

import shopifyConfig from '../../shopify.config';
const {siteDomain} = shopifyConfig;

const LoginButton = () => {
  const {loginWithRedirect} = useAuth0();

  return (
    <button
      className="button"
      onClick={() => loginWithRedirect({redirectUri: `${siteDomain}/shop`})}
    >
      Member Login
    </button>
  );
};

export default LoginButton;
