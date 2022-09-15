import { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";

import Layout from "../components/Layout";
import AuthBlock from "../components/AuthBlock";

const ForgotPassword = ({ codeParam }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Email 12+ chars
  const validEmail = (candidatePassword) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{12,}$/.test(candidatePassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let password = event.target.password.value;
    let passwordConfirmation = event.target.passwordConfirmation.value;

    // Only submit if password is valid and confirmation matches
    if (validEmail(password)) {
      setSuccess(null);
      setError("Your password must be at least 12 characters long");
    } else if (password != passwordConfirmation) {
      setSuccess(null);
      setError("Your password fields must match.");
    } else {
      // Reset password validation
      setError(null);

      await axios({
        method: "post",
        url: "/api/reset-password",
        data: {
          code: codeParam,
          password,
          passwordConfirmation,
        },
        headers: { "content-type": "application/json" },
      }).then((response) => {
        let { error } = response.data;
        if (error && error.status) {
          setError(
            "Something went wrong, your password reset code may be invalid."
          );
        } else {
          setError(null);
          setSuccess(
            <span>
              Your password has been successfully updated. Proceed to the{" "}
              <a
                onClick={() => {
                  signIn("credentials", { callbackUrl: "/" });
                }}>
                Login Page
              </a>
              .
            </span>
          );
        }
      });
    }
  };

  return (
    <Layout>
      <AuthBlock
        title="Reset Password"
        errorMessage={error}
        successMessage={success}
        handleSubmit={handleSubmit}
        submitText="Reset Password">
        <fieldset className="auth-block__fieldset">
          <label className="auth-block__label" htmlFor="email">
            New Password
          </label>
          <input
            className="auth-block__input"
            type="password"
            id="password"
            name="password"
          />
        </fieldset>
        <fieldset className="auth-block__fieldset">
          <label className="auth-block__label" htmlFor="passwordConfirmation">
            Confirm New Password
          </label>
          <input
            className="auth-block__input"
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
          />
        </fieldset>
      </AuthBlock>
    </Layout>
  );
};

// Fetch products for server side rendering
export const getServerSideProps = async (ctx) => {
  // Get query string
  let { query } = ctx;
  // Get reset code from query params
  let code = query.code ? query.code : null;

  return {
    props: { codeParam: code },
  };
};

export default ForgotPassword;
