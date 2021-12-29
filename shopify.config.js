var storeDomain = '';
var storefrontToken = '';
var auth0Domain = '';
var auth0ClientId = '';
var siteDomain = '';

if (import.meta && import.meta.env) {
  // Found import.meta
  storeDomain = import.meta.env.VITE_SHOPIFY_DOMAIN;
  storefrontToken = import.meta.env.VITE_SHOPIFY_TOKEN;
  auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
  auth0ClientId = import.meta.env.VITE_AUTH0_CLIENTID;
  siteDomain = import.meta.env.VITE_SITE_DOMAIN;
} else {
  // Found process.env
  storeDomain = process.env.VITE_SHOPIFY_DOMAIN;
  storefrontToken = process.env.VITE_SHOPIFY_TOKEN;
  auth0Domain = process.env.VITE_AUTH0_DOMAIN;
  auth0ClientId = process.env.VITE_AUTH0_CLIENTID;
  siteDomain = process.env.VITE_SITE_DOMAIN;
}

export default {
  locale: 'en-us',
  storeDomain,
  storefrontToken,
  graphqlApiVersion: 'unstable',
  auth0Domain,
  auth0ClientId,
  siteDomain,
};
