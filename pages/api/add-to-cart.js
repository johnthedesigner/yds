import axios from "axios";
import _ from "lodash";
import cartQuery from "../../utils/cartQuery";

// Fetch from shopify based on supplied graphQl query string
export const addToCart = async (req, res) => {
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
        merchandiseId: "${line.merchandiseId}"
        attributes: [${_.map(line.attributes, (attribute) => {
          if (attribute)
            return `{key: "${attribute.key}", value: "${attribute.value}"}`;
        })}]
      }`;
  }).join(",");

  let newAttributes = _.map(attributes, (attribute) => {
    return `${attribute.key}: "${attribute.value}"`;
  }).join(",");

  var query;

  if (cart && cart !== undefined && cart.id) {
    // If there is an active cart, just add new items
    query = `mutation { 
        cartLinesAdd( 
            cartId: "${cart.id}",
            lines: [ ${newLines} ],
            ${attributes ? `attributes: { ${newAttributes} }` : ""}
        ) { cart ${cartQuery} } }`;
  } else {
    // If there's no active cart, create a new one and add items
    // let query = `query { cart( id: "${id}" ) ${cartQuery} }`;

    query = `mutation {
        cartCreate(
            input: {
                lines: [ ${newLines} ]
                ${attributes ? `attributes: { ${newAttributes} }` : ""}
            }
        ) { cart ${cartQuery} }
    }`;
  }

  await axios
    .post(url, { query: query }, { headers: headers })
    .then((result) => {
      const { data } = result;
      // Find the nested cart object and send it back
      let cart = data.data.cartLinesAdd
        ? data.data.cartLinesAdd
        : data.data.cartCreate;
      res.status(200).json(cart);
    })
    .catch((error) => {
      res.status(200).json(error);
    });
};

export default addToCart;
