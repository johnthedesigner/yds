import { useSession } from "next-auth/react";
import { CheckFeatureEnablement } from "../utils/shopConfig";

const PriceText = ({ shopConfig, price, product }) => {
  const { data: session, status } = useSession();

  // If product has "Supplies" tag record it, otherwise use "Dahlias"
  let productType = product.tags.includes("Supplies") ? "Supplies" : "Dahlias";

  // Check if this product type is selectively disabled
  let productTypeDisabled = product.tags.includes("Supplies")
    ? shopConfig.disableSupplyPrices
    : shopConfig.disableDahliaPrices;

  let disabledGlobally = shopConfig.disableShowPricesGlobally;

  // Format dollar amount
  const Price = `$${(1 * price).toFixed(2)}`;

  // Render the correct price text
  var displayPrice = false;
  var noPriceText = "";
  var statusByRole = "disabled";
  if (status === "authenticated") {
    if (session.earlyAccess) {
      //   console.log("EARLY ACCESS");
      // Early access users
      statusByRole = shopConfig.earlyAccessShowPrice;
      let rangeStart = shopConfig.earlyAccessShopStart;
      let rangeEnd = shopConfig.earlyAccessShopEnd;
      noPriceText = shopConfig.earlyAccessNoPriceText;
      displayPrice = CheckFeatureEnablement(
        disabledGlobally,
        productTypeDisabled,
        statusByRole,
        rangeStart,
        rangeEnd
      );
    } else {
      //   console.log("MEMBER");
      // Members without early access
      statusByRole = shopConfig.memberShowPrice;
      let rangeStart = shopConfig.memberShopStart;
      let rangeEnd = shopConfig.memberShopEnd;
      noPriceText = shopConfig.memberNoPriceText;
      displayPrice = CheckFeatureEnablement(
        disabledGlobally,
        productTypeDisabled,
        statusByRole,
        rangeStart,
        rangeEnd
      );
    }
    // If the product type is "supplies" then display price and add to cart button
    if (productType === "Supplies" && !shopConfig.disableShowPricesGlobally) {
      displayPrice = true;
    }
  } else {
    // console.log("OTHER VISITORS");
    // All other visitors
    statusByRole = shopConfig.allVisitorsShowPrice;
    let rangeStart = shopConfig.allVisitorsShopStart;
    let rangeEnd = shopConfig.allVisitorsShopEnd;
    noPriceText = shopConfig.allVisitorsNoPriceText;
    displayPrice = CheckFeatureEnablement(
      disabledGlobally,
      productTypeDisabled,
      statusByRole,
      rangeStart,
      rangeEnd
    );
  }

  // Selectively render price text
  if (displayPrice) {
    return <>{Price}</>;
  } else {
    return (
      <em>
        <small>{noPriceText}</small>
      </em>
    );
  }
};

export default PriceText;
