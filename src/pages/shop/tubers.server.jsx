import {useState} from 'react';
import _ from 'lodash';
import {
  MediaFileFragment,
  ProductProviderFragment,
  useShopQuery,
  flattenConnection,
  RawHtml,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import {Link} from 'react-router-dom';

import Layout from '../../components/Layout.server';
import NotFound from '../../components/NotFound.server';
import catalogData from '../../catalogData.json';
import ProductFilters from '../../components/ProductFilters.client';
import ProductCard from '../../components/ProductCard.server';

const productTypesMap = {
  'gift-cards': 'Gift Cards',
  supplies: 'Supplies',
  tubers: 'Tubers',
};

const TubersListing = ({selectedOptions}) => {
  const productDisplayIncrement = 24;
  const product_type = 'tubers';

  // Build query tags list
  // const [queryTags, setQueryTags] = useState([]);
  var queryTagString = '';
  _.each(selectedOptions, (tag, index) => {
    if (index === 0) {
      queryTagString += `tag:${tag}`;
    } else {
      queryTagString += ` OR tag:${tag}`;
    }
  });
  queryTagString = `tag:${product_type} AND (${queryTagString})`;
  console.log(queryTagString);

  const {form, color, size} = catalogData.category;
  const formKeys = _.keys(form);
  const colorKeys = _.keys(color);
  const sizeKeys = _.keys(size);

  // Fetch products from shopify
  const {data} = useShopQuery({
    query: QUERY(productDisplayIncrement, queryTagString),
    variables: {
      country: 'US',
      numProducts: productDisplayIncrement,
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
            options={catalogData.category}
            selected={selectedOptions}
          />
        </div>
        <div className="product-listing__grid">
          <h1>Tubers</h1>
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
        </div>
      </div>
    </Layout>
  );
};

const QUERY = (productDisplayIncrement, queryTagString) => {
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
      products(first: ${productDisplayIncrement}, query: "${queryTagString}") {
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
