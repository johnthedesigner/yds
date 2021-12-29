import {useHistory, useLocation} from 'react-router-dom';
import {Auth0Provider} from '@auth0/auth0-react';

import shopifyConfig from '../../shopify.config';

const Auth0ProviderWithHistory = ({children}) => {
  const history = useHistory();
  const {pathname} = useLocation();

  const onRedirectCallback = () => {
    history.push(pathname);
  };

  return (
    <Auth0Provider
      domain={shopifyConfig.auth0Domain}
      clientId={shopifyConfig.auth0ClientId}
      redirectUri={shopifyConfig.siteDomain + pathname}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
