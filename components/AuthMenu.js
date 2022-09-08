import _ from "lodash";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

// Styles for email initial avatar
const initialStyles = {
  display: "inline-block",
  fontSize: "1.5rem",
  lineHeight: "2rem",
  textAlign: "center",
  aspectRatio: 1,
  background: "rgb(198, 90, 96)",
  color: "maroon",
  width: "2rem",
  height: "2rem",
  verticalAlign: "middle",
  borderRadius: "50%",
  marginRight: ".5rem",
};

const LoginButton = ({ currentPath, session }) => {
  // If we're logged in show the user info and "Sign Out" button
  if (session) {
    let initial = session.user.email.slice(0, 1).toUpperCase();
    console.log(initial);
    return (
      <>
        <span style={initialStyles}>
          <span>{initial}</span>
        </span>
        {session.user.email} |{" "}
        <button className="text-button" onClick={() => signOut()}>
          Sign Out
        </button>
      </>
    );
  }
  // Or else, show the "Sign In" button
  return (
    <>
      <button
        className="auth-menu__log-in-button"
        onClick={() => signIn("Credentials", { callbackUrl: currentPath })}>
        Sign In
      </button>
    </>
  );
};

const AuthMenu = () => {
  let { asPath } = useRouter();
  const { data: session } = useSession();
  const { accessToken } = session ? session : { accessToken: null };

  return (
    <div className="auth-menu">
      <LoginButton currentPath={asPath} session={session} />
    </div>
  );
};

export default AuthMenu;
