import _ from 'lodash';
import {useShopQuery, flattenConnection} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import {Link} from 'react-router-dom';

import Layout from '../../components/Layout.server';
import NotFound from '../../components/NotFound.client';
import catalogData from '../../catalogData.json';
import ProductFilters from '../../components/ProductFilters.client';
import ProductFiltersMobile from '../../components/ProductFiltersMobile.client';
import NewProductCard from '../../components/NewProductCard';
import ProductSort from '../../components/ProductSort.client';
import NewSeo from '../../components/NewSeo.client';
import pages from '../../pages.json';

const ShopIndex = ({
  response,
  selectedOptions,
  productCount = 200,
  sortOption = 'titleAsc',
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

  const product_type = 'supplies';

  // Build query tags list
  var queryTagString = '';
  _.each(selectedOptions, (tag, index) => {
    if (index === 0) {
      queryTagString += `tag:${tag}`;
    } else {
      queryTagString += ` OR tag:${tag}`;
    }
  });
  queryTagString = `(tag:${product_type}) AND (${queryTagString})`;

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
  // const sortedProducts = products;
  let ascDesc = _.includes(sortOption, 'Asc') ? 'asc' : 'desc';
  var sortedProducts = _.orderBy(
    products,
    (product) => {
      if (sortOption === 'titleAsc' || sortOption === 'titleDesc') {
        return product.title;
      } else {
        return 1 * product.priceRange.minVariantPrice.amount;
      }
    },
    ascDesc,
  );

  return (
    <Layout>
      <NewSeo page={pages['all-products']} />
      <div className="product-detail__breadcrumb">
        <Link to="/shop">Shop</Link> / <b>Supplies</b>
      </div>
      <div className="product-listing">
        <div className="product-listing__sidebar">
          <ProductFilters
            options={catalogData.category[product_type]}
            selected={selectedOptions}
          />
        </div>
        <div className="product-listing__grid">
          <ProductSort sortOption={sortOption} />
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
        <ProductFiltersMobile
          options={catalogData.category[product_type]}
          selected={selectedOptions}
        />
      </div>
    </Layout>
  );
};

const QUERY = (productCount, queryTagString) => {
  return gql`
query productListing {
  products(first: ${productCount} query: "${queryTagString}") {
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
`;
};

export default ShopIndex;
