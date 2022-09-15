import axios from "axios";

const { STRAPI_TOKEN, STRAPI_API } = process.env;

const requestLimit = 100;

export const getCollection = async (contentType) => {
  let requestUrl = `${STRAPI_API}${contentType}/?populate=%2A&pagination[page]=1&pagination[pageSize]=${requestLimit}`;

  let { data } = await axios.get(requestUrl, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  });

  return data.data;
};
