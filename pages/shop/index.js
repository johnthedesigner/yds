import _ from "lodash";
import Link from "next/link";

import Layout from "../../components/Layout";
import Bumper from "../../components/Bumper";
import NewSeo from "../../components/NewSeo";
import pages from "../../utils/pages.json";
import ProductHighlightRow from "../../components/ProductHighlightRow";
import { getProductsByCollection } from "../../utils/shopify";
import { getShopConfig } from "../../utils/strapi";
import { WithEarlyAccess } from "../../components/AccessControl";

// Should we show tools and supplies yet?
const showSupplies = false;

const ShopIndex = ({ topVarieties, topSupplies, shopConfig }) => {
  console.log(shopConfig);

  return (
    <Layout>
      <NewSeo page={pages.shop} />
      <div className="shop-index">
        <div className="shop-index__header">
          <div className="shop-index__welcome-text">
            <h1>Y.D.S. Shop</h1>
            <WithEarlyAccess shopConfig={shopConfig}>
              <h2>YOU HAVE EARLY ACCESS</h2>
            </WithEarlyAccess>
            <p>The Y.D.S. dahlia shop is open to Y.D.S. Members only.</p>
            <div className="shop-index__button-row">
              <Link href="/membership">
                <a className="button">Become a Member</a>
              </Link>
            </div>
          </div>
        </div>
        <ProductHighlightRow
          title="Dahlias"
          collection={topVarieties}
          indexPath="/shop/dahlias"
          indexTitle="Shop all Dahlias"
          shopConfig={shopConfig}
        />
        {showSupplies && (
          <ProductHighlightRow
            title="Tools & Supplies"
            collection={topSupplies}
            indexPath="/shop/supplies"
            indexTitle="Shop all Tools & Supplies"
            shopConfig={shopConfig}
          />
        )}
      </div>
      <Bumper
        text="Our sales are open to Y.D.S. members, but that's just the beginning of the membership benefits!"
        buttonUrl="/membership"
        buttonLabel="Find out more"
      />
    </Layout>
  );
};

// Fetch products for server side rendering
export const getServerSideProps = async (ctx) => {
  let topVarieties = await getProductsByCollection("top-varieties");
  let topSupplies = await getProductsByCollection("top-supplies");
  let shopConfig = await getShopConfig();

  return {
    props: { topVarieties, topSupplies, shopConfig: shopConfig.attributes },
  };
};

export default ShopIndex;
