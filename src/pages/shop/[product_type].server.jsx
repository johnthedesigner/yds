import _ from 'lodash';
import {
  MediaFileFragment,
  ProductProviderFragment,
  useShopQuery,
  flattenConnection,
  Product,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import {useHistory, useLocation, useParams} from 'react-router-dom';
// import {useEffect} from 'react';

import Layout from '../../components/Layout.server';
import NotFound from '../../components/NotFound.server';
import catalogData from '../../catalogData.json';
import ProductFilters from '../../components/ProductFilters.client';
import AuthRequired from '../../components/AuthRequired.client';
import NewProductCard from '../../components/NewProductCard';

const productTypesMap = {
  'gift-cards': 'Gift Cards',
  supplies: 'Supplies',
  tubers: 'Tubers',
};

const TubersListing = (
  {selectedOptions, productCount = 96},
  pending = false,
) => {
  const productDisplayIncrement = 24;
  const {product_type} = useParams();

  const history = useHistory();
  const {pathname} = useLocation();

  // useEffect(() => {
  //   console.log(pathname);
  //   // history.push(pathname);
  // }, [selectedOptions]);

  // Build query tags list
  var queryTagString = '';
  _.each(selectedOptions, (tag, index) => {
    console.log(tag);
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
          <AuthRequired>
            <ProductFilters
              options={catalogData.category[product_type]}
              selected={selectedOptions}
            />
          </AuthRequired>
        </div>
        <div className="product-listing__grid">
          <AuthRequired>
            <div className="product-grid">
              {sortedProducts.map((product) => {
                return (
                  <div key={product.id} className="product-grid__item">
                    <NewProductCard product={product} />
                  </div>
                );
              })}
            </div>
          </AuthRequired>
        </div>
      </div>
    </Layout>
  );
};

const QUERY = (productCount, queryTagString) => {
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
      products(first: ${productCount}, query: "${queryTagString}" sortKey: TITLE) {
        edges {
          cursor
          node {
            vendor
            title
            totalInventory
            tags
            ...ProductProviderFragment
            hybridizer: metafield(namespace: "my_fields", key: "hybridizer") {
              key
              value
            }
            country_of_origin: metafield(namespace: "my_fields", key: "country_of_origin") {
              key
              value
            }
            introduction_year: metafield(namespace: "my_fields", key: "introduction_year") {
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

export default TubersListing;
