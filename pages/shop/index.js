import _ from "lodash";
import Link from "next/link";
import { signIn } from "next-auth/react";

import Layout from "../../components/Layout";
import Bumper from "../../components/Bumper";
import NewSeo from "../../components/NewSeo";
import pages from "../../utils/pages.json";
import ProductHighlightRow from "../../components/ProductHighlightRow";
import {
  flattenConnection,
  getProductsByCollection,
} from "../../utils/shopify";
import { getShopConfig, getShopHelpText } from "../../utils/strapi";
import { WithoutAccess } from "../../components/AccessControl";
import ShopHelpText from "../../components/ShopHelpText";
import ProductCategories from "../../components/ProductCategories";

const ShopIndex = ({ topVarieties, topSupplies, shopConfig, shopHelpText }) => {
  return (
    <Layout>
      <NewSeo page={pages.shop} />
      <div className="shop-index">
        <ProductCategories />
        <ShopHelpText shopConfig={shopConfig} shopHelpText={shopHelpText} />
        <div className="shop-index__header">
          <div className="shop-index__welcome-text">
            <h1>Y.D.S. Shop</h1>
            <WithoutAccess shopConfig={shopConfig}>
              <p>The Y.D.S. dahlia shop is open to Y.D.S. Members only.</p>
              <div className="shop-index__button-row">
                <button className="button" onClick={signIn}>
                  Member Login
                </button>
                <span style={{ margin: "0 2rem", fontSize: "1.5rem" }}>or</span>
                <Link href="/membership">
                  <a className="button">Become a Member</a>
                </Link>
              </div>
            </WithoutAccess>
          </div>
        </div>
        {shopConfig.showDahliasInShop && (
          <ProductHighlightRow
            title="Dahlias"
            collection={topVarieties}
            indexPath="/shop/dahlias"
            indexTitle="Shop all Dahlias"
            shopConfig={shopConfig}
          />
        )}
        {shopConfig.showSuppliesInShop && (
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
  let shopHelpText = await getShopHelpText();

  return {
    props: {
      topVarieties,
      topSupplies,
      shopConfig: shopConfig.attributes,
      shopHelpText: shopHelpText.attributes,
    },
  };
};

export default ShopIndex;
