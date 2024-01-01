import _ from "lodash";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const LoginButton = ({ currentPath, session }) => {
  // If we're logged in show the user info and "Sign Out" button
  if (session && session.accessToken) {
    return (
      <>
        <span className="auth-menu__user-avatar">
          <Image
            src="/user-avatar.svg"
            width="24"
            height="24"
            alt="user icon"
          />
        </span>
        <span className="auth-menu__user-email">{session.user.email}</span>
        <button
          className="auth-menu__sign-out-button"
          onClick={() => signOut()}>
          Sign Out
        </button>
      </>
    );
  }
  // Or else, show the "Sign In" button
  return (
    <>
      <span style={{ marginRight: "1rem" }}>Log in to shop our store</span>
      <button
        className="auth-menu__sign-in-button"
        onClick={() => signIn("Credentials", { callbackUrl: currentPath })}>
        Member Login
      </button>
    </>
  );
};

const AuthMenu = () => {
  let { asPath } = useRouter();
  const { data: session } = useSession();

  return (
    <div className="auth-menu">
      <LoginButton currentPath={asPath} session={session} />
    </div>
  );
};

export default AuthMenu;
