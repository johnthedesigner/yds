import Layout from "../components/Layout";
import Link from "next/link";

import { getMembershipExpiredText } from "../utils/strapi";

const MembershipExpired = ({ membershipExpiredText }) => {
  console.log(membershipExpiredText);

  return (
    <Layout>
      <div className="auth-block__wrapper">
        <div className="auth-block">
          <div className="auth-block__header">
            <h1 className="auth-block__title">{membershipExpiredText.title}</h1>
          </div>
          <div className="auth-block__body">
            <p>{membershipExpiredText.message}</p>
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
export const getServerSideProps = async () => {
  // Fetch Shop Configuration
  let membershipExpiredText = await getMembershipExpiredText();

  // If there is no callback URL in the query params, fall back on the homepage
  return {
    props: { membershipExpiredText: membershipExpiredText.attributes },
  };
};

export default MembershipExpired;
