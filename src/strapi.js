import axios from 'axios';

import shopifyConfig from '../shopify.config';

const {strapiToken, strapiApi} = shopifyConfig;

export const getCollection = async (contentType) => {
  let requestUri = `${strapiApi}${contentType}/`;

  let {data} = await axios.get(requestUri, {
    headers: {
      Authorization: `Bearer ${strapiToken}`,
    },
  });

  return data.data;
};
