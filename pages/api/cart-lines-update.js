import axios from "axios";
import _ from "lodash";
import cartQuery from "../../utils/cartQuery";

// Fetch from shopify based on supplied graphQl query string
export const cartLineUpdate = async (req, res) => {
  // Get cart id
  let { cart, lines, attributes } = req.body;
  const { SHOPIFY_DOMAIN, SHOPIFY_TOKEN } = process.env;
  const url = `https://${SHOPIFY_DOMAIN}/api/2022-07/graphql.json`;
  const headers = {
    "X-Shopify-Storefront-Access-Token": `${SHOPIFY_TOKEN}`,
    "Content-Type": "application/json",
  };

  let newLines = _.map(lines, (line) => {
    return `{
        quantity: ${line.quantity}
        id: "${line.id}"
      }`;
  }).join(",");

  let newAttributes = _.map(attributes, (attribute) => {
    return `${attribute.key}: "${attribute.value}"`;
  }).join(",");

  var query = `mutation { 
        cartLinesUpdate( 
            cartId: "${cart.id}",
            lines: [ ${newLines} ],
            ${attributes ? `attributes: { ${newAttributes} }` : ""}
        ) { cart ${cartQuery} } }`;

  await axios
    .post(url, { query: query }, { headers: headers })
    .then((result) => {
      const { data } = result;
      // Find the nested cart object and send it back
      let cart = data.data.cartLinesUpdate.cart;
      res.status(200).json(cart);
    })
    .catch((error) => {
      res.status(200).json(error);
    });
};

export default cartLineUpdate;
