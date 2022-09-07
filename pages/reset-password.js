import { useState } from "react";
import axios from "axios";

import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Link from "next/link";
import { signIn } from "next-auth/react";
// import { forgotPassword } from "../utils/strapi";

const ForgotPassword = ({ codeParam }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(null);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [complete, setComplete] = useState(false);

  const handlePasswordInput = (e) => {
    setNewPassword(e.target.value);
  };
  const handleConfirmInput = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Email 12+ chars, max 24, 1 num, 1 symbol
  const validEmail = (candidatePassword) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{12,}$/.test(candidatePassword);
  };

  const handleSubmit = async () => {
    // Only submit if password is valid and confirmation matches
    if (validEmail(newPassword)) {
      setInvalidPassword(true);
    } else if (newPassword != confirmPassword) {
      setPasswordMismatch(true);
    } else {
      // Reset password validation
      setInvalidPassword(false);
      setPasswordMismatch(false);

      await axios({
        method: "post",
        url: "/api/reset-password",
        data: {
          code: codeParam,
          password: newPassword,
          passwordConfirmation: confirmPassword,
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
          setNewPassword("");
          setConfirmPassword("");
        }
      });
    }
  };

  return (
    <Layout>
      <h1>Forgot Password</h1>
      <div
        style={{
          background: "pink",
          display: error ? "block" : "none",
        }}>
        <p>Something went wrong, your password reset code may be invalid.</p>
      </div>
      <div
        style={{
          background: "aquamarine",
          display: complete ? "block" : "none",
        }}>
        <p>
          Your password has been successfully updated. Proceed to the Login
          Page.
        </p>
        <button
          onClick={() => {
            signIn("credentials", { callbackUrl: "/" });
          }}>
          Log In
        </button>
      </div>
      <div
        style={{
          display: complete ? "none" : "block",
        }}>
        <fieldset>
          <label htmlFor="newPassword">
            New Password
            <span style={{ display: invalidPassword ? "inline" : "none" }}>
              Invalid Password
            </span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={handlePasswordInput}
            disabled={codeParam ? false : true}
          />
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => {
              setShowPassword(!showPassword);
            }}
            disabled={codeParam ? false : true}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="confirmPassword">
            Confirm New Password
            <span style={{ display: passwordMismatch ? "inline" : "none" }}>
              Password Mismatch
            </span>
          </label>
          <input
            type={showConfirm ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmInput}
            disabled={codeParam ? false : true}
          />
          <input
            type="checkbox"
            checked={showConfirm}
            onChange={() => {
              setShowConfirm(!showConfirm);
            }}
            disabled={codeParam ? false : true}
          />
        </fieldset>
        <button onClick={handleSubmit}>Update Password</button>
      </div>
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
