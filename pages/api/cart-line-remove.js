import axios from "axios";
import _ from "lodash";
import cartQuery from "../../utils/cartQuery";

// Fetch from shopify based on supplied graphQl query string
export const cartLineRemove = async (req, res) => {
  // Get cart id
  let { cart, lineId, attributes } = req.body;

  const { SHOPIFY_DOMAIN, SHOPIFY_TOKEN } = process.env;
  const url = `https://${SHOPIFY_DOMAIN}/api/2022-07/graphql.json`;
  const headers = {
    "X-Shopify-Storefront-Access-Token": `${SHOPIFY_TOKEN}`,
    "Content-Type": "application/json",
  };

  var query = `mutation { 
        cartLinesRemove( 
            cartId: "${cart.id}",
            lineIds: [ "${lineId}" ],
            ${attributes ? `attributes: { ${newAttributes} }` : ""}
        ) { cart ${cartQuery} } }`;

  await axios
    .post(url, { query: query }, { headers: headers })
    .then((result) => {
      const { data } = result;
      // Find the nested cart object and send it back
      let cart = data.data.cartLinesRemove.cart;
      res.status(200).json(cart);
    })
    .catch((error) => {
      res.status(200).json(error);
    });
};

export default cartLineRemove;
