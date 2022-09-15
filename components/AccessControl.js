import { useAuth0 } from "@auth0/auth0-react";
import _ from "lodash";
import { DateTime } from "luxon";
import { useSession } from "next-auth/react";

export const WithEarlyAccess = ({ children }) => {
  const { user, pending } = useAuth0();
  const roles = user ? user["https:yankeedahliasociety.com/roles"] : [];
  const hasEarlyAccess = _.includes(roles, "Early Access");
  if (pending) {
    return <p>Loading...</p>;
  }
  if (hasEarlyAccess) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export const WithRegularAccess = ({ children }) => {
  const { status } = useSession();

  // TODO: Commented out code gives early access too, need to reimplement

  // const { isAuthenticated, user, pending } = useAuth0();
  // const roles = user ? user["https:yankeedahliasociety.com/roles"] : [];
  // const hasEarlyAccess = _.includes(roles, "Early Access");

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "authenticated") {
    return <>{children}</>;
  } else {
    return null;
  }
};

export const WithAnyAccess = ({ children }) => {
  const { status } = useSession();

  // const { isAuthenticated, pending } = useAuth0();

  if (status === "authenticated") {
    return <>{children}</>;
  } else {
    return null;
  }
};

export const WithoutAccess = ({ children }) => {
  const { status } = useSession();

  // const { pending, isAuthenticated } = useAuth0();

  if (status === "unauthenticated") {
    return <>{children}</>;
  } else {
    return null;
  }
};

export const ShowBefore = ({ threshold, children }) => {
  let thresholdDate = DateTime.fromISO(threshold);
  let now = DateTime.now();
  let countdown = now.until(thresholdDate).length("seconds");
  if (countdown >= 0) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export const ShowAfter = ({ threshold, children }) => {
  let thresholdDate = DateTime.fromISO(threshold);
  let now = DateTime.now();
  let countdown = now.until(thresholdDate).length("seconds");
  if (countdown >= 0) {
    return null;
  } else {
    return <>{children}</>;
  }
};
