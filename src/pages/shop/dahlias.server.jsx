import _ from 'lodash';
import {flattenConnection} from '@shopify/hydrogen';
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
import {getProductListing} from '../../productUtils';

const ShopIndex = ({response, selectedOptions, sortOption = 'titleAsc'}) => {
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

  const productType = 'Dahlias';

  const data = getProductListing(productType, selectedOptions);

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
        <Link to="/shop">Shop</Link> / <b>Dahlias</b>
      </div>
      <div className="product-listing">
        <div className="product-listing__sidebar">
          <ProductFilters
            options={catalogData.category[productType]}
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
          options={catalogData.category[productType]}
          selected={selectedOptions}
        />
      </div>
    </Layout>
  );
};

export default ShopIndex;
