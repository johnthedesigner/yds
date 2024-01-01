import _ from "lodash";
import { DateTime } from "luxon";
import { useSession } from "next-auth/react";

// Check if user is authenticated and membership is not expired
const authCheck = (status) => {
  return status === "authenticated";
};

export const WithEarlyAccess = ({ children }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (authCheck(status) && session.earlyAccess === true) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export const WithRegularAccess = ({ children }) => {
  const { data: session, status } = useSession();
  const { earlyAccess } = session;

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (authCheck(status) && !earlyAccess) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export const WithAnyAccess = ({ children }) => {
  const { status } = useSession();

  if (authCheck(status)) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export const WithoutAccess = ({ children }) => {
  const { status } = useSession();

  if (!authCheck(status)) {
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
