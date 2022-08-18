var storeDomain = '';
var storefrontToken = '';
var auth0Domain = '';
var auth0ClientId = '';
var siteDomain = '';
var contentSpaceId = '';
var contentToken = '';
var strapiApi = '';
var strapiToken = '';

if (import.meta && import.meta.env) {
  // Found import.meta
  storeDomain = import.meta.env.VITE_SHOPIFY_DOMAIN;
  storefrontToken = import.meta.env.VITE_SHOPIFY_TOKEN;
  auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
  auth0ClientId = import.meta.env.VITE_AUTH0_CLIENTID;
  siteDomain = import.meta.env.VITE_SITE_DOMAIN;
  contentSpaceId = import.meta.env.VITE_CONTENT_SPACE_ID;
  contentToken = import.meta.env.VITE_CONTENT_TOKEN;
  strapiApi = import.meta.env.VITE_STRAPI_API;
  strapiToken = import.meta.env.VITE_STRAPI_TOKEN;
} else {
  // Found process.env
  storeDomain = process.env.VITE_SHOPIFY_DOMAIN;
  storefrontToken = process.env.VITE_SHOPIFY_TOKEN;
  auth0Domain = process.env.VITE_AUTH0_DOMAIN;
  auth0ClientId = process.env.VITE_AUTH0_CLIENTID;
  siteDomain = process.env.VITE_SITE_DOMAIN;
  contentSpaceId = process.env.VITE_CONTENT_SPACE_ID;
  contentToken = process.env.VITE_CONTENT_TOKEN;
  strapiApi = process.env.VITE_STRAPI_API;
  strapiToken = process.env.VITE_STRAPI_TOKEN;
}

export default {
  locale: 'en-us',
  storeDomain,
  storefrontToken,
  graphqlApiVersion: 'unstable',
  auth0Domain,
  auth0ClientId,
  siteDomain,
  contentSpaceId,
  contentToken,
  strapiApi,
  strapiToken,
};
