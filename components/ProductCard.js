import _ from "lodash";
import Link from "next/link";

import { TagDescriptor, HybridizerDescriptor } from "./Descriptor";
import { WithAnyAccess, WithoutAccess } from "./AccessControl";
import { flattenConnection } from "../utils/shopify";

const ProductCard = ({ product, linkCard = true, showDetails = true }) => {
  let initialVariant = flattenConnection(product.variants)[0];

  let productImage =
    flattenConnection(product.media).length > 0
      ? flattenConnection(product.media)[0].image
      : {};

  const Price = ({ price }) => {
    return `$${(1 * price).toFixed(2)}`;
  };

  const CountryFlag = ({ product }) => {
    if (product.country_of_origin) {
      let countryString = product.country_of_origin.value.toLowerCase();
      return (
        <img
          className="product-grid__image-flag"
          src={`/flags/1x1/${countryString}.svg`}
          title={`Country of Origin: ${product.country_of_origin.value}`}
        />
      );
    } else {
      return null;
    }
  };

  const ImageOverlay = ({ inventory, country }) => {
    // At which quantity should we stop highlighting inventory
    const inventoryCutoff = 5;
    if (inventory < inventoryCutoff || country) {
      return (
        <div className="product-grid__image-overlay">
          <p className="product-grid__inventory">
            {inventory < inventoryCutoff && (
              <small>
                <em>{inventory} left in stock.</em>
              </small>
            )}
          </p>
          <CountryFlag product={product} />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="product-grid__image">
        <Link href={`/shop/products/${product.handle}`}>
          <a className="product-grid__image-link">
            <img
              src={productImage.url}
              className="gallery__image"
              style={{ aspectRatio: 1, objectFit: "cover" }}
            />
          </a>
        </Link>
        <ImageOverlay
          inventory={initialVariant.quantityAvailable}
          country={product.country_of_origin}
        />
      </div>
      {showDetails && (
        <div className="product-grid__product-info">
          <div>
            <div className="product-grid__title-row">
              <Link href={`/shop/products/`}>
                <a className="product-grid__title-link">
                  <h1 className="product-grid__title">{product.title}</h1>
                </a>
              </Link>
              {/* <WithAnyAccess> */}
              <p className="product-grid__price">
                <Price price={initialVariant.priceV2.amount} />
              </p>
              {/* </WithAnyAccess> */}
              <WithoutAccess>
                <p>
                  <small>
                    <em>Log in for pricing</em>
                  </small>
                </p>
              </WithoutAccess>
            </div>
            <HybridizerDescriptor
              hybridizer={product.hybridizer}
              introduction_year={product.introduction_year}
            />
            <TagDescriptor product={product} tag="form" label="Form" />
            <TagDescriptor product={product} tag="size" label="Size" />
            <TagDescriptor product={product} tag="color" label="Color" />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
