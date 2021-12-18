import _ from 'lodash';
import {
  MediaFileFragment,
  ProductProviderFragment,
  useShopQuery,
  flattenConnection,
  RawHtml,
} from '@shopify/hydrogen';
import {Link, useParams, useLocation} from 'react-router-dom';
import gql from 'graphql-tag';

import LoadMoreProducts from '../../../components/LoadMoreProducts.client';
import Layout from '../../../components/Layout.server';
import ProductCard from '../../../components/ProductCard.server';
import NotFound from '../../../components/NotFound.server';
import catalogData from '../../../catalogData.json';

const productTypesMap = {
  'gift-cards': 'Gift Cards',
  supplies: 'Supplies',
  tubers: 'Tubers',
};

export default function Collection({
  country = {isoCode: 'US'},
  collectionProductCount = 2,
}) {
  const {product_type} = useParams();
  const {search} = useLocation();
  // const cursor = new URLSearchParams(search).get('cursor');

  const {data} = useShopQuery({
    query: QUERY(collectionProductCount, product_type),
    variables: {
      product_type,
      country: country.isoCode,
      numProducts: collectionProductCount,
    },
  });

  // console.log(data, data.products.edges[4].cursor);
  // console.log(JSON.stringify(data));

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
                    <li className="category-list__category">
                      <Link to={`/category/${product_type}/form/${form}`}>
                        <a>{form}</a>
                      </Link>
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
                    <li className="category-list__category">
                      <Link to={`/category/${product_type}/color/${color}`}>
                        <a>{color}</a>
                      </Link>
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
                    <li className="category-list__category">
                      <Link to={`/category/${product_type}/size/${size}`}>
                        <a>{size}</a>
                      </Link>
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

const QUERY = (collectionProductCount, product_type) => {
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
    products(first: ${collectionProductCount}, query: "product_type:${productTypesMap[product_type]}") {
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
