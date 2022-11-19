import { DateTime } from "luxon";

// Check if we are currently within the indicated time range
export const CurrentlyInTimeRange = (start, end) => {
  let currentDateTime = DateTime.now().setZone("America/New_York");
  // Get extents of our range, or very distant point in time
  let startDateTime = start
    ? DateTime.fromISO(start)
    : DateTime.fromISO("2050-01-01");
  let endDateTime = end
    ? DateTime.fromISO(end)
    : DateTime.fromISO("1950-01-01");
  // Check if we're in range
  let beforeEnd = currentDateTime < endDateTime;
  let afterStart = currentDateTime > startDateTime;

  if (beforeEnd && afterStart) {
    return true;
  } else {
    return false;
  }
};

// Check whether a feature is enabled for the current user
export const CheckFeatureEnablement = (
  disabledGlobally,
  statusByRole,
  rangeStart,
  rangeEnd
) => {
  //   console.log("check enablement");
  if (disabledGlobally) {
    // Feature is disabled globally
    // console.log("feature disabled globally:", disabledGlobally);
    return false;
  } else {
    if (statusByRole === "enabled") {
      // Feature explicitly enabled for this role
      //   console.log("enabled by role:", statusByRole);
      return true;
    } else if (statusByRole === "disabled") {
      // Feature explicitly disabled for this role
      //   console.log("disabled by role:", statusByRole);
      return false;
    } else {
      // Check if we are within a valid time range
      //   console.log("use time range:", statusByRole);
      if (rangeStart || rangeEnd) {
        // Make sure range extents are configured
        return CurrentlyInTimeRange(rangeStart, rangeEnd);
      } else {
        // We don't have valid range extents
        return false;
      }
    }
  }
};
