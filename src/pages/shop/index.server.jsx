import _, {has} from 'lodash';
import {
  MediaFileFragment,
  ProductProviderFragment,
  useShopQuery,
  flattenConnection,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';

import Layout from '../../components/Layout.server';
import NotFound from '../../components/NotFound.client';
import catalogData from '../../catalogData.json';
import ProductFilters from '../../components/ProductFilters.client';
import ProductCard from '../../components/ProductCard';
import NewProductCard from '../../components/NewProductCard';
import LoadMoreProducts from '../../components/LoadMoreProducts.client';
import ShopIndexBody from '../../components/ShopIndexBody.client';
import {
  WithEarlyAccess,
  WithRegularAccess,
  WithoutAccess,
  ShowBefore,
  ShowAfter,
} from '../../components/AccessControl.client';
import LoginButton from '../../components/LoginButton..client';

const LaunchDateTime = '2022-01-07T21:11:00-05:00';

const productTypesMap = {
  'gift-cards': 'Gift Cards',
  supplies: 'Supplies',
  tubers: 'Tubers',
};

const ShopIndex = ({response, selectedOptions, productCount = 96}) => {
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

  const productDisplayIncrement = 24;
  const {product_type} = useParams();

  // Fetch products from shopify
  const {data} = useShopQuery({
    query: QUERY(),
    variables: {
      country: 'US',
    },
  });

  // If there are no products available, show "not found"
  if (data?.products == null) {
    return <NotFound />;
  }

  // If there are products, prepare product data
  const products = data ? flattenConnection(data.products) : [];
  const sortedProducts = _.orderBy(products, 'title');
  const hasNextPage = data.products.pageInfo.hasNextPage;

  return (
    <Layout>
      <div className="shop-index">
        <div className="shop-index__header">
          <div className="shop-index__welcome-text">
            <h1>Y.D.S. Shop</h1>
            <WithoutAccess>
              <p>Y.D.S. Tuber sales are open to Y.D.S. Members only</p>
              <div className="shop-index__button-row">
                <LoginButton />{' '}
                <Link to="/membership" className="button">
                  Y.D.S. Membership
                </Link>
              </div>
            </WithoutAccess>
            <WithRegularAccess>
              <p>
                The tuber sale opens for all Y.D.S. members on January 15th,
                2022 at 12:00pm
              </p>
              <ShowAfter threshold={LaunchDateTime}>
                <p>The members-only tuber sale has started!</p>
                <div className="shop-index__button-row">
                  <Link className="button" to="/shop/products">
                    Browse All Products
                  </Link>
                </div>
              </ShowAfter>
            </WithRegularAccess>
            <WithEarlyAccess>
              <p>
                The tuber sale opens for Y.D.S. members with early access on
                January 8th, 2022 at 12:00 pm and for all Y.D.S. members on
                January 15th, 2022 at 12:00pm
              </p>
              <ShowAfter threshold={LaunchDateTime}>
                <p>The early access tuber sale has started!</p>
                <div className="shop-index__button-row">
                  <Link className="button" to="/shop/products">
                    Browse All Products
                  </Link>
                </div>
              </ShowAfter>
            </WithEarlyAccess>
          </div>
        </div>
        <div className="product-grid">
          {sortedProducts.map((product) => {
            return (
              <div key={product.id} className="product-grid__item">
                <NewProductCard
                  product={product}
                  linkCard={false}
                  showDetails={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

const QUERY = () => {
  return gql`
    query CollectionDetails(
      $includeReferenceMetafieldDetails: Boolean = true
      $numProductMetafields: Int = 0
      $numProductVariants: Int = 250
      $numProductMedia: Int = 6
      $numProductVariantMetafields: Int = 0
      $numProductVariantSellingPlanAllocations: Int = 0
      $numProductSellingPlanGroups: Int = 0
      $numProductSellingPlans: Int = 0
    ) {
      products(first: 3, sortKey: TITLE) {
        edges {
          cursor
          node {
            vendor
            title
            tags
            ...ProductProviderFragment
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
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }

    ${MediaFileFragment}
    ${ProductProviderFragment}
  `;
};

export default ShopIndex;
