import { useState } from "react";

import Layout from "../components/Layout";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

import AuthBlock from "../components/AuthBlock";

const Login = ({ callbackUrl }) => {
  const router = useRouter();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    signIn("credentials", {
      identifier: e.target.identifier.value,
      password: e.target.password.value,
      redirect: false,
    }).then((result) => {
      if (result.status === 401) {
        // If credentials are rejected show an error message
        setError(
          "Something went wrong, please check that your login information is correct."
        );
      } else {
        // Otherwise, reset the error and complete login
        setError(null);
        setSuccess("Success! you&apos;re signed in.");
        router.push(callbackUrl);
      }
    });
  };

  const LoginFooter = () => {
    return (
      <Link href="/forgot-password">
        <a>Forgot Password</a>
      </Link>
    );
  };

  return (
    <Layout>
      <AuthBlock
        title="Log In"
        errorMessage={error}
        successMessage={success}
        handleSubmit={handleSubmit}
        Footer={LoginFooter}
        submitText="Log In">
        <fieldset className="auth-block__fieldset">
          <label className="auth-block__label" htmlFor="identifier">
            Your Email
          </label>
          <input
            className="auth-block__input"
            type="email"
            id="identifier"
            name="identifier"
            placeholder="cafeauyay@example.com"
          />
        </fieldset>
        <fieldset className="auth-block__fieldset">
          <label className="auth-block__label" htmlFor="email">
            Password
          </label>
          <input
            className="auth-block__input"
            type="password"
            id="password"
            name="password"
          />
        </fieldset>
      </AuthBlock>
    </Layout>
  );
};

// Fetch products for server side rendering
export const getServerSideProps = async (context) => {
  // Get callback url from query params
  let { callbackUrl } = context.query;

  // If there is no callback URL in the query params, fall back on the homepage
  return {
    props: { callbackUrl: callbackUrl ? callbackUrl : "/" },
  };
};

export default Login;
