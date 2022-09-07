import axios from "axios";

const { STRAPI_DOMAIN } = process.env;
let requestUrl = `${STRAPI_DOMAIN}api/auth/forgot-password`;

const ForgotPassword = async (req, res) => {
  // Get supplied email address
  let { email } = req.body;

  // Post to 'forgot-password' to trigger reset email
  axios
    .post(requestUrl, {
      email,
    })
    .then((response) => {
      // Reset email triggered
      res.status(200).json({ response });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
};

export default ForgotPassword;
