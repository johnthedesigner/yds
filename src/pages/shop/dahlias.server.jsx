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

  const product_type = 'tubers';

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

  // TEMP: only show plants not tubers
  // let productVariants = flattenConnection(product.variants);
  // Find out what value a given variant has for "Type" option
  const getDahliaType = (variant) => {
    let dahliaTypeOption = _.find(variant.selectedOptions, {name: 'Type'});
    let dahliaTypeValue = dahliaTypeOption ? dahliaTypeOption.value : null;
    return dahliaTypeValue;
  };

  // Boolean check of a product for plant variants
  const hasPlantVariant = (product) => {
    let plantVariant = _.find(
      flattenConnection(product.variants),
      (variant) => {
        return getDahliaType(variant) === 'Plant';
      },
    );
    return plantVariant ? true : false;
  };

  // If there are products, prepare product data
  const products = data ? flattenConnection(data.products) : [];
  // const sortedProducts = products;
  var plantProducts = _.remove(products, hasPlantVariant);
  let ascDesc = _.includes(sortOption, 'Asc') ? 'asc' : 'desc';
  var sortedProducts = _.orderBy(
    plantProducts,
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
        <Link to="/shop">Shop</Link> / <b>Dahlias</b>
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
              quantityAvailable
              priceV2 {
                amount
                currencyCode
              }
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
        priceRange {
          minVariantPrice {
            amount
          }
          maxVariantPrice {
            amount
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
