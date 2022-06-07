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
import Bumper from '../../components/Bumper.server';
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
import ProductHighlightRow from '../../components/ProductHighlightRow.server';

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

  return (
    <Layout>
      <NewSeo page={pages.shop} />
      <div className="shop-index">
        <div className="shop-index__header">
          <div className="shop-index__welcome-text">
            <h1>Y.D.S. Shop</h1>
            <p>The Y.D.S. dahlia shop is open to Y.D.S. Members only.</p>
            <div className="shop-index__button-row">
              <Link to="/membership" className="button">
                Become a Member
              </Link>
              <span style={{margin: '1rem'}}>or</span>
              <Link to="/login" className="button">
                Member Login
              </Link>
            </div>
          </div>
        </div>
        <ProductHighlightRow
          title="Tubers"
          collection="top-varieties"
          indexPath="/shop/tubers"
          indexTitle="Shop all Tubers"
        />
        <ProductHighlightRow
          title="Tools & Supplies"
          collection="top-supplies"
          indexPath="/shop/supplies"
          indexTitle="Shop all Tools & Supplies"
        />
      </div>
      <Bumper
        text="Our sales are open to Y.D.S. members, but that's just the beginning of the membership benefits!"
        buttonUrl="/membership"
        buttonLabel="Find out more"
      />
    </Layout>
  );
};

const QUERY = () => {
  return gql`
    query topVarieties {
      collection(handle: "top-varieties") {
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
