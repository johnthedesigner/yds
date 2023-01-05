import { DateTime } from "luxon";

const ShopHelpText = ({ shopConfig }) => {
  let earlyAccessDate = DateTime.fromISO(
    shopConfig.earlyAccessShopStart
  ).toFormat("EEEE, DD");

  let allMembersDate = DateTime.fromISO(shopConfig.memberShopStart).toFormat(
    "EEEE, DD"
  );

  return (
    <div className="shop-help-text">
      <div className="shop-help-text__body">
        <h4 className="shop-help-text__title">
          The YDS Supply Shop is open now to all members!
        </h4>
        <p className="shop-help-text__text">
          The YDS Tuber Sale will begin on {earlyAccessDate} for members with
          Early Access and {allMembersDate} for All Member Access. Preview our
          2023 tuber selection. Still more cultivars and inventory to be added.
          Check back often and look out for announcements.
        </p>
      </div>
    </div>
  );
};

export default ShopHelpText;
