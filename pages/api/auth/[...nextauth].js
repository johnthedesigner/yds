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

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Collect user data to add to the session data
var earlyAccess = false;

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
          // Get user fields and save them to be added to the session
          earlyAccess = data.user.earlyAccess;

          // Only supports {name, email, image}
          return {
            name: data.user.username,
            email: data.user.email,
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
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.jti;
      session.userInfo = user;

      // Add additional user data to the session
      session.earlyAccess = earlyAccess;

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
