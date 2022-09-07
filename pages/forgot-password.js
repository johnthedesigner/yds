import { useState } from "react";
import axios from "axios";

import Layout from "../components/Layout";
import Hero from "../components/Hero";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [complete, setComplete] = useState(false);

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    await axios({
      method: "post",
      url: "/api/forgot-password",
      data: {
        email: email,
      },
      headers: { "content-type": "application/json" },
    }).then((response) => {
      console.log(response);
      let { error } = response.data;
      if (error && error.status) {
        setError(error);
      } else {
        setError(null);
        setComplete(true);
        setEmail("");
      }
    });
  };

  return (
    <Layout
      hero={<Hero title="Get Involved" image="/garden.jpg" />}
      isCommercePage={false}>
      <h1>Forgot Password</h1>
      <div
        style={{
          background: "pink",
          display: error ? "block" : "none",
        }}>
        <p>Something went wrong, please check that your email is correct.</p>
      </div>
      <div
        style={{
          background: "aquamarine",
          display: complete ? "block" : "none",
        }}>
        <p>
          Check your inbox, if there is an account matching this email we will
          send you a password reset email.
        </p>
      </div>
      <div
        style={{
          display: complete ? "none" : "block",
        }}>
        <label htmlFor="email">Your Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailInput}
        />
        <button onClick={handleSubmit}>Reset Password</button>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
