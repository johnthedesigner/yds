import { useSession } from "next-auth/react";
import { CheckFeatureEnablement } from "../utils/shopConfig";

const InventoryText = ({ shopConfig, inventory, product }) => {
  const { data: session, status } = useSession();

  // If product has "Supplies" tag record it, otherwise use "Dahlias"
  let productType = product.tags.includes("Supplies") ? "Supplies" : "Dahlias";

  // Check if this product type is selectively disabled
  let productTypeDisabled = product.tags.includes("Supplies")
    ? shopConfig.disableSupplyShowInventory
    : shopConfig.disableDahliaShowInventory;

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
        productTypeDisabled,
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
        productTypeDisabled,
        statusByRole,
        rangeStart,
        rangeEnd
      );
    }
    // If the product type is "supplies" then display price and add to cart button
    if (
      productType === "Supplies" &&
      !shopConfig.disableShowInventoryGlobally
    ) {
      displayInventory = true;
    }
  } else {
    // console.log("OTHER VISITORS");
    // All other visitors
    let statusByRole = shopConfig.allVisitorsShowInventory;
    let rangeStart = shopConfig.allVisitorsShopStart;
    let rangeEnd = shopConfig.allVisitorsShopEnd;
    displayInventory = CheckFeatureEnablement(
      disabledGlobally,
      productTypeDisabled,
      statusByRole,
      rangeStart,
      rangeEnd
    );
  }

  // Selectively render inventory text
  if (displayInventory) {
    if (inventory === 0) {
      return <>Out of stock.</>;
    } else if (inventory < inventoryCutoff) {
      return <>Only {inventory} left in stock.</>;
    } else {
      return <>In stock.</>;
    }
  } else {
    // return <>Don't Show Inventory</>;
    return null;
  }
};

export default InventoryText;
