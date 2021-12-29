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
import ProductCard from '../../components/ProductCard';
import LoadMoreProducts from '../../components/LoadMoreProducts.client';

const productTypesMap = {
  'gift-cards': 'Gift Cards',
  supplies: 'Supplies',
  tubers: 'Tubers',
};

const ShopIndex = ({selectedOptions, productCount = 96}) => {
  const productDisplayIncrement = 24;
  const {product_type} = useParams();

  // Build query tags list
  //   var queryTagString = '';
  //   _.each(selectedOptions, (tag, index) => {
  //     if (index === 0) {
  //       queryTagString += `tag:${tag}`;
  //     } else {
  //       queryTagString += ` OR tag:${tag}`;
  //     }
  //   });
  //   queryTagString = `tag:${product_type} AND (${queryTagString})`;

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

export default ShopIndex;
