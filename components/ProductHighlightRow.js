import _ from "lodash";
import Link from "next/link";

import { flattenConnection } from "../utils/shopify";
import ProductCard from "../components/ProductCard";

const ProductHighlightRow = ({
  title,
  collection,
  indexPath,
  indexTitle,
  shopConfig,
}) => {
  // If there are products, prepare product data
  const products = collection ? flattenConnection(collection.products) : [];
  const sortedProducts = _.orderBy(products, "title");

  return (
    <>
      <div className="highlight-row__header">
        <h3
          className="highlight-row__title"
          style={{ textAlign: "center", marginTop: "2rem" }}>
          {title}
        </h3>

        <Link href={indexPath}>
          <a className="highlight-row__link-button" title={indexTitle}>
            {indexTitle}
          </a>
        </Link>
      </div>
      <div className="product-grid product-grid__highlight-row">
        {sortedProducts.map((product) => {
          return (
            <div key={product.handle} className="product-grid__item">
              <ProductCard
                product={product}
                shopConfig={shopConfig}
                // linkCard={false}
                // showDetails={false}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductHighlightRow;
