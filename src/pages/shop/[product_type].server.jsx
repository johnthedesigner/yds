import _ from 'lodash';
import {
  MediaFileFragment,
  ProductProviderFragment,
  useShopQuery,
  flattenConnection,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import {useParams} from 'react-router-dom';

import Layout from '../../components/Layout.server';
import NotFound from '../../components/NotFound.server';
import catalogData from '../../catalogData.json';
import ProductFilters from '../../components/ProductFilters.client';
import ProductCard from '../../components/ProductCard.server';
import LoadMoreProducts from '../../components/LoadMoreProducts.client';

const productTypesMap = {
  'gift-cards': 'Gift Cards',
  supplies: 'Supplies',
  tubers: 'Tubers',
};

const TubersListing = ({selectedOptions, productCount = 24}) => {
  const productDisplayIncrement = 24;
  const {product_type} = useParams();

  // Build query tags list
  var queryTagString = '';
  _.each(selectedOptions, (tag, index) => {
    if (index === 0) {
      queryTagString += `tag:${tag}`;
    } else {
      queryTagString += ` OR tag:${tag}`;
    }
  });
  queryTagString = `tag:${product_type} AND (${queryTagString})`;

  // Fetch products from shopify
  const {data} = useShopQuery({
    query: QUERY(productCount, queryTagString),
    variables: {
      country: 'US',
      numProducts: productCount,
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
      <div className="product-listing">
        <div className="product-listing__sidebar">
          <ProductFilters
            options={catalogData.category[product_type]}
            selected={selectedOptions}
          />
        </div>
        <div className="product-listing__grid">
          <h1>{productTypesMap[product_type]}</h1>
          <p>
            {sortedProducts.length}{' '}
            {sortedProducts.length === 1 ? 'product' : 'products'}
          </p>
          <div className="product-grid">
            {sortedProducts.map((product) => {
              return (
                <div key={product.id} className="product-grid__item">
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
          {hasNextPage && (
            <LoadMoreProducts
              productCount={productCount}
              increment={productDisplayIncrement}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

const QUERY = (productCount, queryTagString) => {
  return gql`
  query CollectionDetails(
    $numProductMetafields: Int = 0
    $numProductVariants: Int = 250
    $numProductMedia: Int = 6
    $numProductVariantMetafields: Int = 0
    $numProductVariantSellingPlanAllocations: Int = 0
    $numProductSellingPlanGroups: Int = 0
    $numProductSellingPlans: Int = 0
    ) {
      products(first: ${productCount}, query: "${queryTagString}" sortKey: TITLE) {
        edges {
          cursor
          node {
            vendor
            title
            ...ProductProviderFragment
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

export default TubersListing;
