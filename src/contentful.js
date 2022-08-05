import contentful from 'contentful';

import shopifyConfig from '../shopify.config';

const {contentSpaceId, contentToken} = shopifyConfig;

// Configure contentful client and fetch shows
var client = contentful.createClient({
  space: contentSpaceId,
  accessToken: contentToken,
});

const getContent = (contentType) => {
  return client
    .getEntries({content_type: contentType})
    .then(function (response) {
      return response.items;
    });
};

export default getContent;
