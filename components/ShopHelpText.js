import { DateTime } from "luxon";
import _ from "lodash";

const ShopHelpText = ({ shopConfig, shopHelpText }) => {
  console.log(shopHelpText);
  let earlyAccessDate = DateTime.fromISO(
    shopConfig.earlyAccessShopStart
  ).toFormat("EEEE, DD, t");

  let allMembersDate = DateTime.fromISO(shopConfig.memberShopStart).toFormat(
    "EEEE, DD, t"
  );

  const splitParagraphs = (rawText) => {
    let formattedText = "";
    _.each(rawText.split("\n"), (paragraph) => {
      formattedText += `<p>${paragraph}</p>`;
    });
    return formattedText;
  };

  return (
    <div className="shop-help-text">
      <div className="shop-help-text__body">
        <h4 className="shop-help-text__title">{shopHelpText.title}</h4>
        <div
          className="shop-help-text__text"
          dangerouslySetInnerHTML={{
            __html: splitParagraphs(shopHelpText.message),
          }}
        />
      </div>
    </div>
  );
};

export default ShopHelpText;
