import _ from "lodash";
import { useState } from "react";
import Link from "next/link";

import { flattenConnection } from "../../utils/shopify";

import Layout from "../../components/Layout";
// import NotFound from '../../components/NotFound';
import ProductFilters from "../../components/ProductFilters";
import NewProductCard from "../../components/ProductCard";
import NewSeo from "../../components/NewSeo";

import { getProductsByTags } from "../../utils/shopify";

import pages from "../../utils/pages.json";
import catalogData from "../../utils/catalogData.json";
import { getShopConfig, getShopHelpText } from "../../utils/strapi";
import { useSession } from "next-auth/react";
import ProductCategories from "../../components/ProductCategories";
import ShopHelpText from "../../components/ShopHelpText";

// TODO: this needs to change to "dahlias"
const productType = "tubers";

const ShopIndex = ({ products, queryTags, shopConfig, shopHelpText }) => {
  const [sortOption, setSortOption] = useState("titleAsc");

  // If there are no products available, show "not found"
  if (products == null) {
    // return <NotFound />;
    return null;
  }

  // If there are products, prepare product data
  products = products ? flattenConnection(products) : [];

  let ascDesc = _.includes(sortOption, "Asc") ? "asc" : "desc";
  var sortedProducts = _.orderBy(
    products,
    (product) => {
      if (sortOption === "titleAsc" || sortOption === "titleDesc") {
        return product.title;
      } else {
        return 1 * product.priceRange.minVariantPrice.amount;
      }
    },
    ascDesc
  );

  return (
    <Layout>
      <NewSeo page={pages["dahlias"]} />
      <ProductCategories category="Dahlias" />
      <ShopHelpText shopConfig={shopConfig} shopHelpText={shopHelpText} />
      <div className="product-detail__breadcrumb">
        <Link href="/shop">
          <a>Shop</a>
        </Link>{" "}
        / <b>Dahlias</b>
      </div>
      <div className="product-listing">
        <div className="product-listing__sidebar">
          <ProductFilters
            options={catalogData.category["dahlias"]}
            queryTags={queryTags}
            type="desktop"
          />
        </div>
        <div className="product-listing__grid">
          <div className="product-sort">
            <div className="product-sort__select-wrapper">
              <select
                className="product-sort__select"
                name="sort_key"
                onChange={(e) => {
                  setSortOption(e.target.value);
                }}
                value={sortOption}>
                <option value="titleAsc">Title (A–Z)</option>
                <option value="titleDesc">Title (Z–A)</option>
                <option value="priceAsc">Price (Lowest–Highest)</option>
                <option value="priceDesc">Price (Highest–Lowest)</option>
              </select>
            </div>
          </div>

          <div className="product-grid">
            {sortedProducts.map((product) => {
              return (
                <div key={product.handle} className="product-grid__item">
                  <NewProductCard product={product} shopConfig={shopConfig} />
                </div>
              );
            })}
          </div>
        </div>
        <ProductFilters
          options={catalogData.category["dahlias"]}
          queryTags={queryTags}
          type="mobile"
        />
      </div>
    </Layout>
  );
};

// Fetch products for server side rendering
export const getServerSideProps = async (ctx) => {
  // Build query tags list
  // Get query string
  let { query } = ctx;
  // Build an array of tags
  let tags = query.tags ? query.tags.split(",") : [];
  // Fetch products
  let products = await getProductsByTags(productType, tags);
  // Fetch Shop Configuration
  let shopConfig = await getShopConfig();
  // Fetch shop help text
  let shopHelpText = await getShopHelpText();

  return {
    props: {
      products,
      queryTags: tags,
      shopConfig: shopConfig.attributes,
      shopHelpText: shopHelpText.attributes,
    },
  };
};

export default ShopIndex;
