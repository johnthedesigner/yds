import { useSession } from "next-auth/react";
import { CheckFeatureEnablement } from "../utils/shopConfig";

const InventoryText = ({ shopConfig, inventory }) => {
  const { data: session, status } = useSession();

  let disabledGlobally = shopConfig.disableShowInventoryGlobally;

  // Above this quanity, we will not show inventory figures
  const inventoryCutoff = 5;

  // Render the correct price text
  var displayInventory = false;
  if (status === "authenticated") {
    if (session.earlyAccess) {
      //   console.log("EARLY ACCESS");
      // Early access users
      let statusByRole = shopConfig.earlyAccessShowInventory;
      let rangeStart = shopConfig.earlyAccessShopStart;
      let rangeEnd = shopConfig.earlyAccessShopEnd;
      displayInventory = CheckFeatureEnablement(
        disabledGlobally,
        statusByRole,
        rangeStart,
        rangeEnd
      );
    } else {
      //   console.log("MEMBER");
      // Members without early access
      let statusByRole = shopConfig.memberShowInventory;
      let rangeStart = shopConfig.memberShopStart;
      let rangeEnd = shopConfig.memberShopEnd;
      displayInventory = CheckFeatureEnablement(
        disabledGlobally,
        statusByRole,
        rangeStart,
        rangeEnd
      );
    }
  } else {
    // console.log("OTHER VISITORS");
    // All other visitors
    let statusByRole = shopConfig.allVisitorsShowInventory;
    let rangeStart = shopConfig.allVisitorsShopStart;
    let rangeEnd = shopConfig.allVisitorsShopEnd;
    displayInventory = CheckFeatureEnablement(
      disabledGlobally,
      statusByRole,
      rangeStart,
      rangeEnd
    );
  }

  // Selectively render inventory text
  if (displayInventory) {
    if (inventory === 0) {
      return (
        <small>
          <em>Out of stock.</em>
        </small>
      );
    } else if (inventory < inventoryCutoff) {
      return (
        <small>
          <em>Only {inventory} left in stock.</em>
        </small>
      );
    } else {
      return (
        <small>
          <em>In stock.</em>
        </small>
      );
    }
  } else {
    return null;
  }
};

export default InventoryText;
