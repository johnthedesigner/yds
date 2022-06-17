import {useShopQuery, flattenConnection} from '@shopify/hydrogen';
import gql from 'graphql-tag';
import _ from 'lodash';
import {Link} from '@shopify/hydrogen';

import NewProductCard from '../components/NewProductCard';

const ProductHighlightRow = ({title, collection, indexPath, indexTitle}) => {
  // Fetch products from shopify
  const {data} = useShopQuery({
    query: QUERY(collection),
  });

  // If there are no products available, show "not found"
  if (data?.collection.products == null) {
    return <NotFound />;
  }

  // If there are products, prepare product data
  const products = data ? flattenConnection(data.collection.products) : [];
  const sortedProducts = _.orderBy(products, 'title');
  const hasNextPage = data.collection.products.pageInfo.hasNextPage;

  return (
    <>
      <div className="highlight-row__header">
        <h3
          className="highlight-row__title"
          style={{textAlign: 'center', marginTop: '2rem'}}
        >
          {title}
        </h3>

        <Link
          to={indexPath}
          className="highlight-row__link-button"
          title={indexTitle}
        >
          {indexTitle}
        </Link>
      </div>
      <div className="product-grid product-grid__highlight-row">
        {sortedProducts.map((product) => {
          return (
            <div key={product.id} className="product-grid__item">
              <NewProductCard
                product={product}
                // linkCard={false}
                // showDetails={false}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

const QUERY = (handle) => {
  return gql`
    query topVarieties {
      collection(handle: "${handle}") {
        products(first: 4) {
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
    }
  `;
};

export default ProductHighlightRow;
