import { DateTime } from "luxon";

const ShopHelpText = ({ shopConfig }) => {
  let earlyAccessDate = DateTime.fromISO(
    shopConfig.earlyAccessShopStart
  ).toFormat("EEEE, DD, t");

  let allMembersDate = DateTime.fromISO(shopConfig.memberShopStart).toFormat(
    "EEEE, DD, t"
  );

  return (
    <div className="shop-help-text">
      <div className="shop-help-text__body">
        <h4 className="shop-help-text__title">
          Dahlia Tubers & Growing Supplies available in the YDS Shop
        </h4>
        <p className="shop-help-text__text">
          The YDS Tuber Sale will be restocked on Sunday, April 16, 2023 at
          1:00pm.
          <br />
          Planting in our gardens is right around the corner and just in time we
          have 27 new-to-offer dahlia varieties in our club store with wonderful
          cultivars restocked. Lots of tubers are still available on our website
          and you will want to take another look. Get them now before they are
          gone.
        </p>
      </div>
    </div>
  );
};

export default ShopHelpText;
