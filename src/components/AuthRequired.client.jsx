import {withAuthenticationRequired} from '@auth0/auth0-react';

import {Loading} from './AuthMenu.client';

const AuthRequired = ({children}) => {
  return <>{children}</>;
};

export default withAuthenticationRequired(AuthRequired, {
  onRedirecting: () => <Loading />,
});
