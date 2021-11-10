var storeDomain = '';
var storefrontToken = '';
if (import.meta && import.meta.env) {
  // Found import.meta
  storeDomain = import.meta.env.VITE_SHOPIFY_DOMAIN;
  storefrontToken = import.meta.env.VITE_SHOPIFY_TOKEN;
} else if (process.env) {
  // Found process.env
  storeDomain = process.env.VITE_SHOPIFY_DOMAIN;
  storefrontToken = process.env.VITE_SHOPIFY_TOKEN;
}

export default {
  locale: 'en-us',
  storeDomain,
  storefrontToken,
  graphqlApiVersion: 'unstable',
};
