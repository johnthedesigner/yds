import _ from 'lodash';
import {
  MediaFileFragment,
  ProductProviderFragment,
  useShopQuery,
  flattenConnection,
  RawHtml,
} from '@shopify/hydrogen';
import {Link, useParams} from 'react-router-dom';
import gql from 'graphql-tag';

import LoadMoreProducts from '../../../components/LoadMoreProducts.client';
import Layout from '../../../components/Layout.server';
import ProductCard from '../../../components/ProductCard';
import NotFound from '../../../components/NotFound.server';
import catalogData from '../../../catalogData.json';

const productTypesMap = {
  'gift-cards': 'Gift Cards',
  supplies: 'Supplies',
  tubers: 'Tubers',
};

export default function Collection({
  country = {isoCode: 'US'},
  collectionProductCount = 24,
}) {
  const {product_type} = useParams();

  console.log(productTypesMap[product_type]);

  const {data} = useShopQuery({
    query: QUERY(product_type),
    variables: {
      product_type,
      country: country.isoCode,
      numProducts: collectionProductCount,
    },
  });

  if (data?.products == null) {
    return <NotFound />;
  }

  const products = data ? flattenConnection(data.products) : [];
  const sortedProducts = _.orderBy(products, 'title');

  const hasNextPage = data.products.pageInfo.hasNextPage;

  return (
    <Layout>
      <div className="product-listing">
        <div className="product-listing__sidebar">
          <h4>Categories</h4>
          <ul className="category-list">
            <li className="category-list__parent">
              Form
              <ul>
                {_.map(catalogData.category.form, (form) => {
                  return (
                    <li key={form} className="category-list__category">
                      <Link to={`/categories/forms/${form}`}>{form}</Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className="category-list__parent">
              Color
              <ul>
                {_.map(catalogData.category.color, (color) => {
                  return (
                    <li key={form} className="category-list__category">
                      <Link to={`/categories/forms/${form}`}>{form}</Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className="category-list__parent">
              Size
              <ul>
                {_.map(catalogData.category.size, (size) => {
                  return (
                    <li key={form} className="category-list__category">
                      <Link to={`/categories/forms/${form}`}>{form}</Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </div>
        <div className="product-listing__grid">
          <h1 className="font-bold text-4xl md:text-5xl text-gray-900 mb-6 mt-6">
            {productTypesMap[product_type]}
          </h1>
          <p className="text-sm text-gray-500 mt-5 mb-5">
            {sortedProducts.length}{' '}
            {sortedProducts.length > 1 ? 'products' : 'product'}
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {sortedProducts.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>

          {hasNextPage && (
            <LoadMoreProducts startingCount={collectionProductCount} />
          )}
        </div>
      </div>
    </Layout>
  );
}

const QUERY = (product_type) => {
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
    products(first: 500, query: "product_type:${productTypesMap[product_type]}") {
      edges {
        node {
          vendor
          title
          ...ProductProviderFragment
        }
      }
      pageInfo {
        hasNextPage
      }
    }
    productTypes(first: 10) {
      edges {
        node
      }
    }
  }

  ${MediaFileFragment}
  ${ProductProviderFragment}
`;
};
