import _ from "lodash";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { flattenConnection } from "../../../utils/shopify";
import { useContext } from "react";

// import NotFound from '../../../components/NotFound.client';
import Layout from "../../../components/Layout";
import {
  HybridizerDescriptor,
  TagDescriptor,
} from "../../../components/Descriptor";
import {
  ShowAfter,
  ShowBefore,
  WithEarlyAccess,
  WithAnyAccess,
  WithoutAccess,
  WithRegularAccess,
} from "../../../components/AccessControl";
import LoginButton from "../../../components/LoginButton";
import NewSeo from "../../../components/NewSeo";
import { getProductByHandle } from "../../../utils/shopify";
import { CartContext } from "../../_app";
// import { addToCart } from "../../../utils/useApi";

const ProductDetail = ({ product }) => {
  // const { addToCart } = useApi();
  const { addToCart } = useContext(CartContext);
  const router = useRouter();
  const { pathname, query } = router;

  if (!product) {
    return null;
  }

  const productImages = flattenConnection(product.media);
  const productImage =
    productImages.length > 0
      ? flattenConnection(product.media)[0].image.url
      : "/no-image.svg";

  const initialVariant = flattenConnection(product.variants)[0];

  // Use add to cart functionality
  const handleAddToCart = () => {
    let newLines = [
      {
        merchandiseId: initialVariant.id,
        quantity: 1,
      },
    ];
    addToCart(newLines);
  };

  function AddToCartMarkup() {
    return (
      <div style={{ margin: "2rem 0" }}>
        <button className="button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    );
  }

  const ConditionalDescription = () => {
    if (product.description) {
      return (
        <div className="product-detail__description">{product.description}</div>
      );
    } else {
      return null;
    }
  };

  // Figure out what to show, based on auth, role and time window
  const earlyAccessStart = "2022-01-08T15:00:00-05:00";
  const allAccessStart = "2022-01-15T15:00:00-05:00";
  const allAccessEnd = "2023-01-15T15:00:00-05:00";

  // What should happen during the early access sale period
  const EarlyAccessPeriod = () => {
    return (
      <ShowAfter threshold={earlyAccessStart}>
        <ShowBefore threshold={allAccessStart}>
          <WithEarlyAccess>
            <AddToCartMarkup />
          </WithEarlyAccess>
          <WithRegularAccess>
            <p style={{ marginTop: "2rem" }}>
              <em>
                Sales are closed temporarily. As a member, you will be notified
                in advance of our next sale.
              </em>
            </p>
          </WithRegularAccess>
        </ShowBefore>
      </ShowAfter>
    );
  };

  // What should happen during the all-members sale period
  const AllAccessPeriod = () => {
    return (
      <ShowAfter threshold={allAccessStart}>
        <ShowBefore threshold={allAccessEnd}>
          <WithAnyAccess>
            <AddToCartMarkup />
          </WithAnyAccess>
        </ShowBefore>
      </ShowAfter>
    );
  };

  // What should happen if there is no active sale
  const NoAccessPeriod = () => {
    return (
      <ShowBefore threshold={earlyAccessStart}>
        <ShowAfter threshold={allAccessEnd}>
          <p style={{ marginTop: "2rem" }}>
            <em>
              Sales are closed temporarily. Members will be notified in advance
              of our next sale.
            </em>
          </p>
        </ShowAfter>
      </ShowBefore>
    );
  };

  const ProductPrice = ({ price }) => {
    return <>{`$${(1 * price).toFixed(2)}`}</>;
  };

  return (
    <Layout>
      <NewSeo product={product} />
      <div className="product-detail__breadcrumb">
        <Link href="/shop">
          <a>Shop</a>
        </Link>{" "}
        /{" "}
        <Link href="/shop/dahlias">
          <a>Dahlias</a>
        </Link>{" "}
        / <b className="product-detail__title">{product.title}</b>
      </div>
      <div className="product-detail">
        <div className="product-detail__gallery-container">
          <Image
            src={productImage}
            layout="responsive"
            width="1fr"
            height="1fr"
            className="gallery__image"
            alt={`Product image - ${product.title}`}
            priority={true}
          />
        </div>
        <div className="product-detail__product-info">
          <div>
            <h1 className="product-detail__title">{product.title}</h1>
            <WithoutAccess>
              <p style={{ marginBottom: "2rem" }}>
                <em>Log in for pricing</em>
              </p>
            </WithoutAccess>
            <WithAnyAccess>
              <p className="product-detail__price">
                <ProductPrice price={initialVariant.priceV2.amount} />
              </p>
            </WithAnyAccess>
            <p>
              {product.totalInventory < 15 && (
                <small>
                  <em>{initialVariant.quantityAvailable} left in stock.</em>
                </small>
              )}
            </p>
          </div>
          <ConditionalDescription />
          <HybridizerDescriptor
            hybridizer={product.hybridizer}
            introduction_year={product.introduction_year}
          />
          <TagDescriptor product={product} tag="form" label="Form" />
          <TagDescriptor product={product} tag="size" label="Size" />
          <TagDescriptor product={product} tag="color" label="Color" />
          <div>
            <EarlyAccessPeriod />
            <AllAccessPeriod />
            <NoAccessPeriod />
            <WithoutAccess>
              <p style={{ marginTop: "2rem" }}>
                <em>Sales are open to members only</em>
              </p>
              <p style={{ marginTop: "1rem" }}>
                <LoginButton className="button" />
              </p>
            </WithoutAccess>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Fetch membership products for server side rendering
export const getServerSideProps = async (ctx) => {
  let { handle } = ctx.params;
  let product = await getProductByHandle(handle);

  return { props: { product } };
};

export default ProductDetail;
