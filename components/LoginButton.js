// import { useAuth0 } from "@auth0/auth0-react";
import { signIn } from "next-auth/react";

// import shopifyConfig from "../../shopify.config";
// const { siteDomain } = shopifyConfig;
// const { DOMAIN } = process.env;

const LoginButton = () => {
  // const { loginWithRedirect } = useAuth0();

  return (
    <button className="button" onClick={signIn}>
      Member Login
    </button>
  );
};

export default LoginButton;
