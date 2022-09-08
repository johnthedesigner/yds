import { useState } from "react";
import axios from "axios";

import Layout from "../components/Layout";
import AuthBlock from "../components/AuthBlock";

const ForgotPassword = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let email = e.target.email.value;

    await axios({
      method: "post",
      url: "/api/forgot-password",
      data: {
        email,
      },
      headers: { "content-type": "application/json" },
    }).then((response) => {
      console.log(response);
      let { error } = response.data;
      if (error && error.status) {
        setSuccess(null);
        setError(
          "Something went wrong, please check that your email is correct."
        );
      } else {
        setError(null);
        setSuccess(
          `Check your inbox, if there is an account matching ${submittedEmail} we will send you a password reset email.`
        );
        setSubmittedEmail(email);
      }
    });
  };

  return (
    <Layout>
      <AuthBlock
        title="Forgot Password"
        errorMessage={error}
        successMessage={success}
        handleSubmit={handleSubmit}
        submitText="Reset Password">
        <fieldset className="auth-block__fieldset">
          <label className="auth-block__label" htmlFor="email">
            Your Email
          </label>
          <input
            className="auth-block__input"
            type="email"
            id="email"
            name="email"
            placeholder="cafeauyay@example.com"
          />
        </fieldset>
      </AuthBlock>
    </Layout>
  );
};

export default ForgotPassword;
