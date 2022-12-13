import axios from "axios";

const { STRAPI_TOKEN, STRAPI_API } = process.env;

const requestLimit = 100;

export const getCollection = async (contentType, page = 1, pageSize = 2) => {
  console.log(page, pageSize);
  let requestUrl = `${STRAPI_API}${contentType}/?populate=%2A&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

  let { data } = await axios.get(requestUrl, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  });

  return data.data;
};

export const getMessages = async (page = 1, pageSize = 2) => {
  let requestUrl = `${STRAPI_API}messages/?populate=%2A&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

  let { data } = await axios.get(requestUrl, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  });

  return data.data;
};

export const getMessage = async (id) => {
  let requestUrl = `${STRAPI_API}messages/${id}`;

  let { data } = await axios.get(requestUrl, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  });

  return data.data;
};

export const addressMessage = async (id, status) => {
  let requestUrl = `${STRAPI_API}messages/${id}`;

  let { data } = await axios.post(requestUrl, {
    data: {
      id,
      addressed: status,
    },
  });

  console.log(data);

  return data.data;
};

export const getShopConfig = async () => {
  let requestUrl = `${STRAPI_API}shop-config`;

  let { data } = await axios.get(requestUrl);

  return data.data;
};
