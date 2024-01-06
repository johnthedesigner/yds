// import axios from "axios";

// const { STRAPI_TOKEN, STRAPI_API } = process.env;

// export const getCollection = async (contentType) => {
//   let requestUri = `${STRAPI_API}${contentType}/?populate=%2A`;

//   let { data } = await axios.get(requestUri, {
//     headers: {
//       Authorization: `Bearer ${STRAPI_TOKEN}`,
//     },
//   });

//   return data.data;
// };

// ---------------

import { DateTime } from "luxon";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Update current session properties
const refreshToken = async (token) => {
  // console.log("REFRESHING TOKEN");
  const res = await fetch(`${process.env.STRAPI_API}users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.jwt}`,
    },
  });
  const data = await res.json();

  // If no error and we have user data, update fields and return new token
  if (res.ok && data) {
    // Set a time after which we will refresh this token upon a new pageload
    let currentTime = DateTime.now();
    let refreshHorizon = currentTime.plus({ seconds: 30 });

    // Build new token with updated properties
    console.log("token", token);
    return {
      ...token,
      earlyAccess: data.earlyAccess,
      membershipExpired: data.membershipExpired,
      refreshHorizon, // Reset refresh horizon
    };
  }
};

const expirationCheck = (session) => {
  if (session.membershipExpired) {
    let expiredSession = { ..._.omit(session, "accessToken") };
    expiredSession;
    return expiredSession;
  } else {
    return session;
  }
};

export default NextAuth({
  debug: true,
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        identifier: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch(`${process.env.STRAPI_API}auth/local`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        // If no error and we have user data, return it
        if (res.ok && data) {
          // Only supports {name, email, image}
          return {
            name: data.user.username,
            email: data.user.email,
            earlyAccess: data.user.earlyAccess,
            membershipExpired: data.user.membershipExpired,
            jwt: data.jwt,
          };
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async redirect({ url, baseUrl }) {
      // Redirect to current page ('url'), use 'baseUrl' for homepage
      return url;
    },
    async jwt({ token, user, account, profile }) {
      // Persist the OAuth access_token to the token right after signin
      if (user && account) {
        // Check if the users's membership has expired
        if (user.membershipExpired) {
          // Membership expired, don't pass a JWT
          token.membershipExpired = user.membershipExpired;
        } else {
          // Membership is active, pass a JWT
          token.accessToken = account.access_token;
          // Mark user's early access status
          token.earlyAccess = user.earlyAccess;
          // Record user's token
          token.jwt = user.jwt;
        }
        // Set a time after which we will refresh this token upon a new pageload
        let currentTime = DateTime.now();
        token.refreshHorizon = currentTime.plus({ seconds: 30 });
      }

      // TODO: Check for token expiration and refresh session properties
      if (DateTime.now() > DateTime.fromISO(token.refreshHorizon)) {
        return refreshToken(token);
      }

      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      if (token) {
        session.accessToken = token.jti;
        session.earlyAccess = token.earlyAccess;
        session.membershipExpired = token.membershipExpired;
      }

      if (user) {
        session.userInfo = user;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
});
