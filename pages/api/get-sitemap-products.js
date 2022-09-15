import axios from "axios";
import _ from "lodash";

// Fetch from shopify based on supplied graphQl query string
export const getSitemapProducts = async (req, res) => {
  const { SHOPIFY_DOMAIN, SHOPIFY_TOKEN } = process.env;
  const url = `https://${SHOPIFY_DOMAIN}/api/2022-07/graphql.json`;
  const headers = {
    "X-Shopify-Storefront-Access-Token": `${SHOPIFY_TOKEN}`,
    "Content-Type": "application/json",
  };

  let productCount = 200;

  let tags = ["tubers"];

  let tagString = _.map(tags, (tag) => {
    return `tag:${tag}`;
  }).join(" AND ");

  let query = `
  query Products {
      products(first: ${productCount} query: "${tagString}") {
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
`;

  await axios
    .post(url, { query: query }, { headers: headers })
    .then((result) => {
      // Find the nested cart object and send it back
      res.status(200).json(result.data.data.products);
    })
    .catch((error) => {
      let { locations } = error;
      res.status(200).json({ locations });
    });
};

export default getSitemapProducts;
