import _ from "lodash";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { flattenConnection } from "../../../utils/shopify";

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

const ProductDetail = ({ product }) => {
  //   const {handle} = useParams();
  const router = useRouter();
  const { pathname, query } = router;

  if (!product) {
    return <NotFound />;
  }

  const productImage = flattenConnection(product.media)[0].image;

  const initialVariant = flattenConnection(product.variants)[0];

  function AddToCartMarkup() {
    const { selectedVariant } = useProduct();
    const isOutOfStock = !selectedVariant.availableForSale;

    return (
      <>
        {/* <Product.SelectedVariant.AddToCartButton
        className="product-detail__button"
        disabled={isOutOfStock}>
        {isOutOfStock ? "Out of stock" : "Add to bag"}
      </Product.SelectedVariant.AddToCartButton> */}
        Add to Cart
      </>
    );
  }

  const ConditionalDescription = () => {
    if (product.description) {
      return <Product.Description className="product-detail__description" />;
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
            src={productImage.url}
            layout="responsive"
            width="1fr"
            height="1fr"
            className="gallery__image"
            style={{ aspectRatio: 1, objectFit: "cover" }}
            alt={`Product image - ${product.title}`}
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
                {initialVariant.priceV2.amount}
              </p>
            </WithAnyAccess>
            <WithEarlyAccess>
              <p>
                {product.totalInventory < 5 && (
                  <small>
                    <em>{initialVariant.quantityAvailable} left in stock.</em>
                  </small>
                )}
              </p>
            </WithEarlyAccess>
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
