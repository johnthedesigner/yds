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
import {useAuth0} from '@auth0/auth0-react';

import Layout from '../../components/Layout.server';
import NotFound from '../../components/NotFound.client';
import catalogData from '../../catalogData.json';
import ProductFilters from '../../components/ProductFilters.client';
import ProductCard from '../../components/ProductCard';
import NewProductCard from '../../components/NewProductCard';
import LoadMoreProducts from '../../components/LoadMoreProducts.client';
import {
  WithEarlyAccess,
  WithRegularAccess,
  WithoutAccess,
  ShowBefore,
  ShowAfter,
} from '../../components/AccessControl.client';
import LoginButton from '../../components/LoginButton..client';
import NewSeo from '../../components/NewSeo.client';
import pages from '../../pages.json';

const LaunchDateTime = '2022-01-08T15:00:00-05:00';

const productTypesMap = {
  'gift-cards': 'Gift Cards',
  supplies: 'Supplies',
  tubers: 'Tubers',
};

const ShopIndex = ({
  response,
  selectedOptions,
  productCount = 96,
  authStatus = {isAuthenticated: false, isLoading: false, user: null},
}) => {
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

  // const {loginWithRedirect, logout, user, isAuthenticated, isLoading} =
  //   useAuth0();
  let {isAuthenticated, isLoading, user} = authStatus;

  const productDisplayIncrement = 24;
  const {product_type} = useParams();

  // Fetch products from shopify
  const {data} = useShopQuery({
    query: QUERY('top-varieties'),
  });

  // If there are no products available, show "not found"
  console.log(data);
  if (data?.collection.products == null) {
    return <NotFound />;
  }

  // If there are products, prepare product data
  const products = data ? flattenConnection(data.collection.products) : [];
  const sortedProducts = _.orderBy(products, 'title');
  const hasNextPage = data.collection.products.pageInfo.hasNextPage;

  return (
    <Layout>
      <NewSeo page={pages.shop} />
      <div className="shop-index">
        <div className="shop-index__header">
          <div className="shop-index__welcome-text">
            <h1>Y.D.S. Shop</h1>
            <p>Y.D.S. Tuber sales are open to Y.D.S. Members only.</p>
            <p>
              Inventory will be replenished throughout the winter and spring.
              Check your member newsletters for updates.
            </p>
            {/* <p>
              The tuber sale opens for all Y.D.S. members on January 15th, 2022
              at 3:00pm.
            </p>
            <WithEarlyAccess>
              <p>
                The tuber sale opens for Y.D.S. members with early access on
                January 8th, 2022 at 3:00 pm.
              </p>
              <p>The early access tuber sale has started!</p>
            </WithEarlyAccess> */}
            <div className="shop-index__button-row">
              <Link className="button" to="/shop/products">
                Browse All Products
              </Link>
            </div>
            <div className="shop-index__button-row">
              <Link to="/membership" className="button">
                Y.D.S. Membership
              </Link>
            </div>
          </div>
        </div>
        <h3 style={{textAlign: 'center', marginTop: '2rem'}}>Top Products</h3>
        <div className="product-grid">
          {sortedProducts.map((product) => {
            return (
              <div key={product.id} className="product-grid__item">
                <NewProductCard
                  product={product}
                  // linkCard={false}
                  // showDetails={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

const QUERY = (handle) => {
  return gql`
query CollectionDetails {
  collection(handle: "${handle}") {
  products(first: 3) {
    edges {
      cursor
      node {
        handle
        vendor
        title
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
        media(first: 10) {
          edges {
            node {
              ... on MediaImage {
                mediaContentType
                image {
                  id
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              image {
                id
                url
                altText
                width
                height
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}
}
`;
};

export default ShopIndex;
