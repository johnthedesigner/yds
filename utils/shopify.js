import axios from "axios";
import _ from "lodash";

// Fetch from shopify based on supplied graphQl query string
export const graphQlFetch = async (query) => {
  const { SHOPIFY_DOMAIN, SHOPIFY_TOKEN } = process.env;

  const url = `https://${SHOPIFY_DOMAIN}/api/2022-07/graphql.json`;

  const headers = {
    "X-Shopify-Storefront-Access-Token": `${SHOPIFY_TOKEN}`,
    "Content-Type": "application/json",
  };

  let response;

  await axios
    .post(url, { query: query }, { headers: headers })
    .then((result) => {
      let { data } = result;
      response = data.data;
    })
    .catch((error) => {
      console.log(error, error);
    });

  return response;
};

// Flatten connections from shopify requests
export const flattenConnection = (connection) => {
  return _.map(connection.edges, (edge) => {
    return { ...edge.node };
  });
};

// Get single product by handle
export const getProductByHandle = async (handle) => {
  let result = await graphQlFetch(`
    query productByHandle {
        productByHandle(handle: "${handle}") {
            description
            handle
            vendor
            title
            totalInventory
            tags
            options(first: 10) {
                name
                values
            }
            media(first: 10) {
                edges {
                  node {
                    ... on MediaImage {
                      mediaContentType
                      image {
                        id
                        url
                        altText
                        width
                        height
                      }
                    }
                  }
                }
              }
            variants(first: 10) {
                edges {
                    node {
                        id
                        quantityAvailable
                        priceV2 {
                            amount
                            currencyCode
                        }
                        image {
                            id
                            url
                            altText
                            width
                            height
                        }
                        selectedOptions {
                            name
                            value
                        }
                    }
                }
            }
            priceRange {
                minVariantPrice {
                    amount
                }
                maxVariantPrice {
                    amount
                }
            }
        }
    }
    `);
  let { productByHandle } = result;
  return productByHandle;
};

// Get product collection by handle
export const getProductsByCollection = async (handle) => {
  let { collection } = await graphQlFetch(`
    query topVarieties {
      collection(handle: "${handle}") {
        products(first: 4) {
          edges {
            cursor
            node {
              handle
              vendor
              title
              totalInventory
              tags
              hybridizer: metafield(namespace: "my_fields", key: "hybridizer") {
                key
                value
              }
              country_of_origin: metafield(
                namespace: "my_fields"
                key: "country_of_origin"
              ) {
                key
                value
              }
              introduction_year: metafield(
                namespace: "my_fields"
                key: "introduction_year"
              ) {
                key
                value
              }
              asd_code: metafield(namespace: "my_fields", key: "ads_code") {
                key
                value
              }
              bloom_size: metafield(namespace: "my_fields", key: "bloom_size") {
                key
                value
              }
              height: metafield(namespace: "my_fields", key: "height") {
                key
                value
              }
              media(first: 10) {
                edges {
                  node {
                    ... on MediaImage {
                      mediaContentType
                      image {
                        id
                        url
                        altText
                        width
                        height
                      }
                    }
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    quantityAvailable
                    priceV2 {
                        amount
                        currencyCode
                    }
                    image {
                      id
                      url
                      altText
                      width
                      height
                    }
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                }
                maxVariantPrice {
                  amount
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
        }
      }
    }
    `);
  return collection;
};

// Get product collection by handle
export const getProductsByTags = async (productTypeTag, categoryTags) => {
  let productCount = 200;

  var queryTagString = "";
  _.each(categoryTags, (tag, index) => {
    if (index === 0) {
      queryTagString += `tag:${tag}`;
    } else {
      queryTagString += ` OR tag:${tag}`;
    }
  });
  queryTagString = `(tag:${productTypeTag}) AND (${queryTagString})`;
  let { products } = await graphQlFetch(`
        query productListing {
            products(first: ${productCount} query: "${queryTagString}") {
            edges {
                cursor
                node {
                handle
                vendor
                title
                totalInventory
                tags
                hybridizer: metafield(namespace: "my_fields", key: "hybridizer") {
                    key
                    value
                }
                country_of_origin: metafield(
                    namespace: "my_fields"
                    key: "country_of_origin"
                ) {
                    key
                    value
                }
                introduction_year: metafield(
                    namespace: "my_fields"
                    key: "introduction_year"
                ) {
                    key
                    value
                }
                asd_code: metafield(namespace: "my_fields", key: "ads_code") {
                    key
                    value
                }
                bloom_size: metafield(namespace: "my_fields", key: "bloom_size") {
                    key
                    value
                }
                height: metafield(namespace: "my_fields", key: "height") {
                    key
                    value
                }
                media(first: 10) {
                    edges {
                    node {
                        ... on MediaImage {
                        mediaContentType
                        image {
                            id
                            url
                            altText
                            width
                            height
                        }
                        }
                    }
                    }
                }
                variants(first: 10) {
                    edges {
                    node {
                        id
                        quantityAvailable
                        priceV2 {
                        amount
                        currencyCode
                        }
                        image {
                        id
                        url
                        altText
                        width
                        height
                        }
                        selectedOptions {
                        name
                        value
                        }
                    }
                    }
                }
                priceRange {
                    minVariantPrice {
                    amount
                    }
                    maxVariantPrice {
                    amount
                    }
                }
                }
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
            }
            }
        }
    `);
  return products;
};

export const getSitemapProducts = async (productTypeTag, categoryTags) => {
  let productCount = 300;

  let tags = '(tag:"tubers") AND (tag:"supplies")';

  // TODO: Add better tagging/filtering for sitemap visible products
  let { products } = await graphQlFetch(`
        query Products {
            products(first: ${productCount}) {
            edges {
                node {
                updatedAt
                handle
                images(first: 1) {
                    edges {
                    node {
                        url
                        altText
                    }
                    }
                }
                }
            }
            }
        }
    `);
  return products;
};
