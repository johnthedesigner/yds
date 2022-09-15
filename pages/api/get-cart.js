import axios from "axios";
import _ from "lodash";

import cartQuery from "../../utils/cartQuery";

// Fetch from shopify based on supplied graphQl query string
export const getCart = async (req, res) => {
  // Get cart id
  let { id } = req.body;

  const { SHOPIFY_DOMAIN, SHOPIFY_TOKEN } = process.env;
  const url = `https://${SHOPIFY_DOMAIN}/api/2022-07/graphql.json`;
  const headers = {
    "X-Shopify-Storefront-Access-Token": `${SHOPIFY_TOKEN}`,
    "Content-Type": "application/json",
  };

  let query = `query {
    cart(
        id: "${id}"
    ) ${cartQuery}
  }`;

  await axios
    .post(url, { query: query }, { headers: headers })
    .then((result) => {
      // Find the nested cart object and send it back
      res.status(200).json(result.data.data.cart);
    })
    .catch((error) => {
      let { locations } = error;
      res.status(200).json({ locations });
    });
};

export default getCart;
