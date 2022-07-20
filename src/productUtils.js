import _ from 'lodash';
import {useShopQuery} from '@shopify/hydrogen';
import gql from 'graphql-tag';

const buildQuery = (productCount, queryTagString) => {
  return gql`
  query productListing {
    products(first: ${productCount} query: "${queryTagString}") {
      edges {
        cursor
        node {
          handle
          productType
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
  `;
};

export const getProductListing = (productType, selectedOptions) => {
  // Max number of products to request
  const productCount = 200;

  // Build query tags list
  var queryTagString = '';
  _.each(selectedOptions, (tag, index) => {
    if (index === 0) {
      queryTagString += `tag:${tag}`;
    } else {
      queryTagString += ` OR tag:${tag}`;
    }
  });
  queryTagString = `(product_type:${productType}) AND (${queryTagString})`;

  // Fetch products from shopify
  const {data} = useShopQuery({
    query: buildQuery(productCount, queryTagString),
    variables: {
      country: 'US',
      numProducts: productCount,
    },
  });

  return data;
};
