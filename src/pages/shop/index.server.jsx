import _ from 'lodash';
import {
  MediaFileFragment,
  ProductProviderFragment,
  useShopQuery,
  flattenConnection,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import {useParams} from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';

import Layout from '../../components/Layout.server';
import NotFound from '../../components/NotFound.client';
import catalogData from '../../catalogData.json';
import ProductFilters from '../../components/ProductFilters.client';
import ProductCard from '../../components/ProductCard';
import NewProductCard from '../../components/NewProductCard';
import LoadMoreProducts from '../../components/LoadMoreProducts.client';

const productTypesMap = {
  'gift-cards': 'Gift Cards',
  supplies: 'Supplies',
  tubers: 'Tubers',
};

const ShopIndex = ({selectedOptions, productCount = 96}) => {
  const productDisplayIncrement = 24;
  const {product_type} = useParams();

  const {isAuthenticated, isLoading} = useAuth0();

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
        <h1>Y.D.S. Shop</h1>
        <h2>Tubers</h2>
        <p>
          {isAuthenticated && !isLoading
            ? 'User is logged in'
            : 'User is not logged in'}
        </p>
        <div className="product-grid">
          {sortedProducts.map((product) => {
            return (
              <div key={product.id} className="product-grid__item">
                <NewProductCard product={product} />
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
