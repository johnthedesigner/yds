import { useState } from "react";

import Layout from "../components/Layout";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

const Login = ({ callbackUrl }) => {
  const router = useRouter();

  const [error, setError] = useState(null);
  const [complete, setComplete] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    signIn("credentials", {
      identifier: e.target.email.value,
      password: e.target.password.value,
      redirect: false,
    }).then((result) => {
      if (result.status === 401) {
        // If credentials are rejected show an error message
        setError(result);
      } else {
        // Otherwise, reset the error and complete login
        setError(null);
        setComplete(true);
        router.push(callbackUrl);
      }
    });
  };

  return (
    <Layout>
      <h1>Log In</h1>
      <div
        style={{
          background: "pink",
          display: error ? "block" : "none",
        }}>
        <p>
          Something went wrong, please check that your login information is
          correct.
        </p>
      </div>
      <div
        style={{
          background: "aquamarine",
          display: complete ? "block" : "none",
        }}>
        <p>Success! you&apos;re signed in.</p>
      </div>
      <div
        style={{
          display: complete ? "none" : "block",
        }}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="email">Password</label>
          <input type="password" id="password" name="password" />
          <button type="submit">Log In</button>
        </form>
        <p>
          <Link href="/forgot-password">
            <a>Forgot Password</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
};

// Fetch products for server side rendering
export const getServerSideProps = async (context) => {
  // Get callback url from query params
  let { callbackUrl } = context.query;

  return {
    props: { callbackUrl },
  };
};

export default Login;
