import { useSession } from "next-auth/react";
import { CheckFeatureEnablement } from "../utils/shopConfig";

const PriceText = ({ shopConfig, price }) => {
  const { data: session, status } = useSession();

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
        statusByRole,
        rangeStart,
        rangeEnd
      );
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