import axios from "axios";

const { STRAPI_TOKEN, STRAPI_API } = process.env;

export const getCollection = async (contentType) => {
  let requestUrl = `${STRAPI_API}${contentType}/?populate=%2A`;

  let { data } = await axios.get(requestUrl, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  });

  return data.data;
};
