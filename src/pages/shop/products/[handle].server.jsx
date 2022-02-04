import _ from 'lodash';
import {Product, flattenConnection, useProduct} from '@shopify/hydrogen/client';
import {useShopQuery, ProductProviderFragment} from '@shopify/hydrogen';
import {useParams} from 'react-router-dom';
import gql from 'graphql-tag';
import {Link} from 'react-router-dom';

import NotFound from '../../../components/NotFound.client';
import Layout from '../../../components/Layout.server';
import Gallery from '../../../components/Gallery.client';
import TagDescriptor from '../../../components/TagDescriptor';
import HybridizerDescriptor from '../../../components/HybridizerDescriptor';
import {
  ShowAfter,
  ShowBefore,
  WithEarlyAccess,
  WithAnyAccess,
  WithoutAccess,
  WithRegularAccess,
} from '../../../components/AccessControl.client';
import LoginButton from '../../../components/LoginButton..client';
import NewSeo from '../../../components/NewSeo.client';

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

  // Figure out what to show, based on auth, role and time window
  const earlyAccessStart = '2022-01-08T15:00:00-05:00';
  const allAccessStart = '2022-01-15T15:00:00-05:00';
  const allAccessEnd = '2023-01-15T15:00:00-05:00';

  // What should happen during the early access sale period
  const EarlyAccessPeriod = () => {
    return (
      <ShowAfter threshold={earlyAccessStart}>
        <ShowBefore threshold={allAccessStart}>
          <WithEarlyAccess>
            <AddToCartMarkup />
          </WithEarlyAccess>
          <WithRegularAccess>
            <p style={{marginTop: '2rem'}}>
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
          <p style={{marginTop: '2rem'}}>
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
      <NewSeo product={data.product} />
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
              <WithoutAccess>
                <p style={{marginBottom: '2rem'}}>
                  <em>Log in for pricing</em>
                </p>
              </WithoutAccess>
              <WithAnyAccess>
                <Product.SelectedVariant.Price
                  className="product-detail__price"
                  as="p"
                />
              </WithAnyAccess>
              <WithEarlyAccess>
                <p>
                  {product.totalInventory < 5 && (
                    <small>
                      <em>{data.product.totalInventory} left in stock.</em>
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
                <p style={{marginTop: '2rem'}}>
                  <em>Sales are open to members only</em>
                </p>
                <p style={{marginTop: '1rem'}}>
                  <LoginButton className="button" />
                </p>
              </WithoutAccess>
            </div>
          </div>
        </div>
      </Product>
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
