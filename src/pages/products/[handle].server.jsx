import _ from 'lodash';
import {Product, flattenConnection, useProduct} from '@shopify/hydrogen/client';
import {Image, useShopQuery, ProductProviderFragment} from '@shopify/hydrogen';
import {useParams} from 'react-router-dom';
import gql from 'graphql-tag';

import ProductDetails from '../../components/ProductDetails.client';
import NotFound from '../../components/NotFound.server';
import Layout from '../../components/Layout.server';
import Gallery from '../../components/Gallery.client';
import ProductOptions from '../../components/ProductOptions.client';
import {
  BUTTON_PRIMARY_CLASSES,
  BUTTON_SECONDARY_CLASSES,
} from '../../components/Button.client';

export default function ProductDetail({country = {isoCode: 'US'}}) {
  const {handle} = useParams();

  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
      handle,
    },
  });

  if (!data.product) {
    return <NotFound />;
  }

  const {product} = data;
  const initialVariant = flattenConnection(product.variants)[0];

  function ProductPriceMarkup() {
    return (
      <Product.SelectedVariant.Price className="product-detail__price" as="p">
        {({currencyCode, amount, currencyNarrowSymbol}) =>
          `${currencyNarrowSymbol}${amount}`
        }
      </Product.SelectedVariant.Price>
    );
  }

  function AddToCartMarkup() {
    const {selectedVariant} = useProduct();
    const isOutOfStock = !selectedVariant.availableForSale;

    return (
      <Product.SelectedVariant.AddToCartButton
        className="product-detail__button"
        disabled={isOutOfStock}
      >
        {isOutOfStock ? 'Out of stock' : 'Add to bag'}
      </Product.SelectedVariant.AddToCartButton>
    );
  }

  return (
    <Layout>
      <div className="product-detail">
        <Product product={data.product} initialVariantId={initialVariant.id}>
          <div className="product-detail__gallery-container">
            <Gallery />
          </div>
          <div className="product-detail__product-info">
            <div>
              <Product.Title as="h1" className="product-detail__title" />
              <ProductPriceMarkup />
              <p>
                <small>
                  <em>{data.product.totalInventory} left in stock.</em>
                </small>
              </p>
            </div>
            <div>
              <AddToCartMarkup />
            </div>
            <Product.Description className="product-detail__description" />
          </div>
        </Product>
      </div>
    </Layout>
  );
}

const QUERY = gql`
  query product(
    $country: CountryCode
    $handle: String!
    $includeReferenceMetafieldDetails: Boolean = true
    $numProductMetafields: Int = 20
    $numProductVariants: Int = 250
    $numProductMedia: Int = 6
    $numProductVariantMetafields: Int = 10
    $numProductVariantSellingPlanAllocations: Int = 0
    $numProductSellingPlanGroups: Int = 0
    $numProductSellingPlans: Int = 0
  ) @inContext(country: $country) {
    product: product(handle: $handle) {
      description
      id
      tags
      totalInventory
      vendor
      seo {
        title
        description
      }
      images(first: 1) {
        edges {
          node {
            url
          }
        }
      }
      ...ProductProviderFragment
    }
  }

  ${ProductProviderFragment}
`;
