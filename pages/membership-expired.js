import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

import AuthBlock from "../components/AuthBlock";
import Image from "next/image";

const MembershipExpired = ({ callbackUrl }) => {
  return (
    <Layout>
      <div className="auth-block__wrapper">
        <div className="auth-block">
          <div className="auth-block__header">
            <h1 className="auth-block__title">Your membership has expired</h1>
          </div>
          <div className="auth-block__body">
            <p>
              The current membership year began August 1, 2023 and ends July 31,
              2024.
            </p>
            <p>
              <Link href="/membership">
                <a className="button button--stretch">About YDS Membership</a>
              </Link>
            </p>
            <p>
              <Link href="/membership/join">
                <a className="button button--stretch">Renew your membership</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
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

export default MembershipExpired;
