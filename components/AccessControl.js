import { useAuth0 } from "@auth0/auth0-react";
import _ from "lodash";
import { DateTime } from "luxon";

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
  const { isAuthenticated, user, pending } = useAuth0();
  const roles = user ? user["https:yankeedahliasociety.com/roles"] : [];
  const hasEarlyAccess = _.includes(roles, "Early Access");
  if (pending) {
    return <p>Loading...</p>;
  }
  if (isAuthenticated && !hasEarlyAccess) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export const WithAnyAccess = ({ children }) => {
  const { isAuthenticated, pending } = useAuth0();
  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export const WithoutAccess = ({ children }) => {
  const { pending, isAuthenticated } = useAuth0();
  if (!pending && !isAuthenticated) {
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
