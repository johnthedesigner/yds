import { useSession } from "next-auth/react";
import Link from "next/link";
import { CheckFeatureEnablement } from "../utils/shopConfig";

const AddToCartButton = ({ shopConfig, handleClick, product }) => {
  console.log(shopConfig);
  const { data: session, status } = useSession();

  // If product has "Supplies" tag record it, otherwise use "Dahlias"
  let productType = product.tags.includes("Supplies") ? "Supplies" : "Dahlias";

  // Check if this product type is selectively disabled
  let productTypeDisabled = product.tags.includes("Supplies")
    ? shopConfig.disableSupplyAddToCart
    : shopConfig.disableDahliaAddToCart;

  let disabledGlobally = shopConfig.disableAddToCartGlobally;

  // Render the correct price text
  var enableAddToCart = false;
  var statusByRole = "disabled";
  if (status === "authenticated") {
    if (session.earlyAccess) {
      console.log("EARLY ACCESS");
      // Early access users
      statusByRole = shopConfig.earlyAccessAddToCart;
      let rangeStart = shopConfig.earlyAccessShopStart;
      let rangeEnd = shopConfig.earlyAccessShopEnd;
      enableAddToCart = CheckFeatureEnablement(
        disabledGlobally,
        productTypeDisabled,
        statusByRole,
        rangeStart,
        rangeEnd
      );
    } else {
      console.log("MEMBER");
      // Members without early access
      statusByRole = shopConfig.memberAddToCart;
      let rangeStart = shopConfig.memberShopStart;
      let rangeEnd = shopConfig.memberShopEnd;
      console.log("enableAddToCart", enableAddToCart);
      enableAddToCart = CheckFeatureEnablement(
        disabledGlobally,
        productTypeDisabled,
        statusByRole,
        rangeStart,
        rangeEnd
      );
    }
    // If the product type is "supplies" then display price and add to cart button
    // Unless this is disabled globally
    if (
      productType === "Supplies" &&
      !shopConfig.disableAddToCartGlobally &&
      !shopConfig.disableSupplyAddToCart
    ) {
      enableAddToCart = true;
    }
  } else {
    console.log("OTHER VISITORS");
    // All other visitors
    statusByRole = shopConfig.allVisitorsAddToCart;
    let rangeStart = shopConfig.allVisitorsShopStart;
    let rangeEnd = shopConfig.allVisitorsShopEnd;
    enableAddToCart = CheckFeatureEnablement(
      disabledGlobally,
      productTypeDisabled,
      statusByRole,
      rangeStart,
      rangeEnd
    );
  }

  // Selectively render price text
  console.log("productTypeDisabled", productTypeDisabled);
  console.log("enableAddToCart", enableAddToCart);
  if (enableAddToCart) {
    return (
      <button className="button" onClick={handleClick}>
        Add to Cart
      </button>
    );
  } else {
    if (status === "authenticated") {
      return (
        <em>
          Sales are closed. Members will be notified in advance of our next
          sale.
        </em>
      );
    } else {
      return (
        <em>
          Sales are open to members only.{" "}
          <Link href="/membership">
            <a>Become a member</a>
          </Link>{" "}
          to get notified when our shop opens.
        </em>
      );
    }
  }
};

export default AddToCartButton;
