import _ from "lodash";
import Link from "next/link";

import { TagDescriptor, HybridizerDescriptor, Descriptor } from "./Descriptor";
import { flattenConnection, getAwards, getCallouts } from "../utils/shopify";
import Image from "next/image";
import PriceText from "./PriceText";
import InventoryText from "./InventoryText";
import Callout from "./Callout";

const ProductCard = ({
  product,
  linkCard = true,
  showDetails = true,
  shopConfig,
}) => {
  let initialVariant = flattenConnection(product.variants)[0];

  let productImage =
    flattenConnection(product.media).length > 0
      ? flattenConnection(product.media)[0].image
      : {};

  let awards = getAwards(product);
  let callouts = getCallouts(product);

  const CountryFlag = ({ product }) => {
    if (product.country_of_origin) {
      let countryString = product.country_of_origin.value.toLowerCase();
      return (
        <Image
          className="product-grid__image-flag"
          src={`/flags/1x1/${countryString}.svg`}
          title={`Country of Origin: ${product.country_of_origin.value}`}
          alt={`Country of Origin: ${product.country_of_origin.value}`}
          width="18"
          height="18"
        />
      );
    } else {
      return null;
    }
  };

  const ImageOverlay = ({ inventory, country }) => {
    // At which quantity should we stop highlighting inventory
    const inventoryCutoff = 5;
    if (inventory || country) {
      return (
        <div className="product-grid__image-overlay">
          <p className="product-grid__inventory">
            <small>
              <em>
                <InventoryText shopConfig={shopConfig} inventory={inventory} />
              </em>
            </small>
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
            <Image
              src={productImage.url ? productImage.url : "/no-image.svg"}
              className="gallery__image"
              // style={{ aspectRatio: 1, objectFit: "cover" }}
              alt="product.title"
              layout="responsive"
              width="1"
              height="1"
            />
          </a>
        </Link>
        <Callout callouts={callouts} />
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
              <p className="product-grid__price">
                <PriceText
                  shopConfig={shopConfig}
                  price={initialVariant.priceV2.amount}
                />
              </p>
            </div>
            <HybridizerDescriptor
              hybridizer={product.hybridizer}
              introduction_year={product.introduction_year}
            />
            <TagDescriptor product={product} tag="form" label="Form" />
            <TagDescriptor product={product} tag="size" label="Size" />
            <TagDescriptor product={product} tag="color" label="Color" />
            {awards[0] && (
              <Descriptor label="Awards" value={awards.join(", ")} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
