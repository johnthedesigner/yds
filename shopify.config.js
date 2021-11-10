export default {
  locale: 'en-us',
  storeDomain: import.meta.env ? import.meta.env.VITE_SHOPIFY_DOMAIN : '',
  storefrontToken: import.meta.env ? import.meta.env.VITE_SHOPIFY_TOKEN : '',
  graphqlApiVersion: 'unstable',
};
