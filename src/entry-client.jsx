import renderHydrogen from '@shopify/hydrogen/entry-client';
import {ShopifyProvider} from '@shopify/hydrogen/client';

import Auth0ProviderWithHistory from './components/Auth0ProviderWithHistory';
import shopifyConfig from '../shopify.config';

function ClientApp({children}) {
  return (
    <Auth0ProviderWithHistory>
      <ShopifyProvider shopifyConfig={shopifyConfig}>
        {children}
      </ShopifyProvider>
    </Auth0ProviderWithHistory>
  );
}

export default renderHydrogen(ClientApp);
