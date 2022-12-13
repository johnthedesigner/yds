import axios from "axios";

const { STRAPI_DOMAIN, STRAPI_TOKEN } = process.env;
let requestUrl = `${STRAPI_DOMAIN}api/messages`;

const postMessage = async (req, res) => {
  // Get supplied email address
  // let { email } = req.body;
  console.log(req.body);

  // Post to 'forgot-password' to trigger reset email
  axios
    .post(
      requestUrl,
      { data: req.body },
      {
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
      }
    )
    .then((response) => {
      // Reset email triggered
      res.status(200).json({ response });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
};

export default postMessage;
