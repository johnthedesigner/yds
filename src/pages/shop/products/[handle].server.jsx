import _ from 'lodash';
import {Product, flattenConnection, useProduct} from '@shopify/hydrogen/client';
import {useShopQuery, ProductProviderFragment} from '@shopify/hydrogen';
import {useParams} from 'react-router-dom';
import gql from 'graphql-tag';
import {Link} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';

import NotFound from '../../../components/NotFound.client';
import Layout from '../../../components/Layout.server';
import Gallery from '../../../components/Gallery.client';
// import AuthRequired from '../../../components/AuthRequired.client';
import TagDescriptor from '../../../components/TagDescriptor';
import HybridizerDescriptor from '../../../components/HybridizerDescriptor';
import {
  ShowAfter,
  ShowBefore,
  WithEarlyAccess,
  WithAnyAccess,
  WithoutAccess,
} from '../../../components/AccessControl.client';
import LoginButton from '../../../components/LoginButton..client';

const ProductDetail = ({response, country = {isoCode: 'US'}}) => {
  response.cache({
    // Cache the page for one hour.
    // maxAge: 60 * 60,
    maxAge: 0,
    // Serve the stale page for up to 23 hours while getting a fresh response in the background.
    // staleWhileRevalidate: 23 * 60 * 60,
    staleWhileRevalidate: 0,
    // cache-control no-cache
    noStore: true,
  });

  const earlyAccessStart = '2022-01-08T15:00:00-05:00';
  const allAccessStart = '2022-01-08T15:00:00-05:00';
  const allAccessEnd = '2022-01-08T15:00:00-05:00';

  const {handle} = useParams();

  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
      handle,
    },
  });

  if (!data.product) {
    return <NotFound />;
  }

  const {product} = data ? data : {};
  const initialVariant = flattenConnection(product.variants)[0];

  function AddToCartMarkup() {
    const {selectedVariant} = useProduct();
    const isOutOfStock = !selectedVariant.availableForSale;

    return (
      <Product.SelectedVariant.AddToCartButton
        className="product-detail__button"
        disabled={isOutOfStock}
      >
        {isOutOfStock ? 'Out of stock' : 'Add to bag'}
      </Product.SelectedVariant.AddToCartButton>
    );
  }

  const ConditionalDescription = () => {
    if (product.description) {
      return <Product.Description className="product-detail__description" />;
    } else {
      return null;
    }
  };

  return (
    <Layout>
      {/* <AuthRequired> */}
      <Product product={data.product} initialVariantId={initialVariant.id}>
        <div className="product-detail__breadcrumb">
          <Link to="/shop">Shop</Link> /{' '}
          <Link to="/shop/products">All Products</Link> /{' '}
          <Product.Title as="b" className="product-detail__title" />
        </div>
        <div className="product-detail">
          <div className="product-detail__gallery-container">
            <Gallery />
          </div>
          <div className="product-detail__product-info">
            <div>
              <Product.Title as="h1" className="product-detail__title" />
              <Product.SelectedVariant.Price
                className="product-detail__price"
                as="p"
              />
              <p>
                {product.totalInventory < 5 && (
                  <small>
                    <em>{data.product.totalInventory} left in stock.</em>
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
              <ShowAfter threshold={earlyAccessStart}>
                <ShowBefore threshold={allAccessStart}>
                  <WithEarlyAccess>
                    <AddToCartMarkup />
                  </WithEarlyAccess>
                </ShowBefore>
              </ShowAfter>
              <ShowAfter threshold={allAccessStart}>
                <ShowBefore threshold={allAccessEnd}>
                  <WithAnyAccess>
                    <AddToCartMarkup />
                  </WithAnyAccess>
                </ShowBefore>
              </ShowAfter>
              <WithoutAccess>
                <p style={{marginTop: '2rem'}}>
                  <em>Sales are open to members only</em>
                </p>
                <LoginButton className="button" />
              </WithoutAccess>
            </div>
          </div>
        </div>
      </Product>
      {/* </AuthRequired> */}
    </Layout>
  );
};

const QUERY = gql`
  query product(
    $country: CountryCode
    $handle: String!
    $includeReferenceMetafieldDetails: Boolean = true
    $numProductMetafields: Int = 20
    $numProductVariants: Int = 250
    $numProductMedia: Int = 6
    $numProductVariantMetafields: Int = 10
    $numProductVariantSellingPlanAllocations: Int = 0
    $numProductSellingPlanGroups: Int = 0
    $numProductSellingPlans: Int = 0
  ) @inContext(country: $country) {
    product: product(handle: $handle) {
      description
      id
      tags
      totalInventory
      totalInventory
      tags
      hybridizer: metafield(namespace: "my_fields", key: "hybridizer") {
        key
        value
      }
      country_of_origin: metafield(
        namespace: "my_fields"
        key: "country_of_origin"
      ) {
        key
        value
      }
      introduction_year: metafield(
        namespace: "my_fields"
        key: "introduction_year"
      ) {
        key
        value
      }
      asd_code: metafield(namespace: "my_fields", key: "ads_code") {
        key
        value
      }
      bloom_size: metafield(namespace: "my_fields", key: "bloom_size") {
        key
        value
      }
      height: metafield(namespace: "my_fields", key: "height") {
        key
        value
      }
      seo {
        title
        description
      }
      images(first: 1) {
        edges {
          node {
            url
          }
        }
      }
      ...ProductProviderFragment
    }
  }

  ${ProductProviderFragment}
`;

export default ProductDetail;
