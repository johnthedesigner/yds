import axios from "axios";

const { STRAPI_DOMAIN } = process.env;
let requestUrl = `${STRAPI_DOMAIN}api/auth/reset-password`;

const ResetPassword = async (req, res) => {
  // Get supplied fields
  let { code, password, passwordConfirmation } = req.body;

  // Post to 'reset-password' to update password
  axios
    .post(requestUrl, {
      code,
      password,
      passwordConfirmation,
    })
    .then((response) => {
      // Updated
      res.status(200).json({ response });
    })
    .catch((error) => {
      res.status(200).json({ error });
    });
};

export default ResetPassword;
