import {
  Image,
  useShopQuery,
  flattenConnection,
  LocalizationProvider,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import Header from './Header.client';
import Footer from './Footer.server';
import {useCartUI} from './CartUIProvider.client';
import Cart from './Cart.client';

export default function Layout({children, hero, isCommercePage}) {
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      numCollections: 3,
    },
    cache: {
      maxAge: 60,
      staleWhileRevalidate: 60 * 10,
    },
  });
  const {isCartOpen, closeCart} = useCartUI();
  const collections = data ? flattenConnection(data.collections) : null;
  const products = data ? flattenConnection(data.products) : null;
  const storeName = data ? data.shop.name : 'Yankee Dahlia Society';
  const productTypes = data ? flattenConnection(data.productTypes) : null;
  const productTypeSlugs = productTypes.map((type) => {
    return type
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  });

  return (
    <>
      <div className="absolute top-0 left-0">
        <a
          href="#mainContent"
          className="p-4 focus:block sr-only focus:not-sr-only"
        >
          Skip to content
        </a>
      </div>
      <div>
        <Header
          collections={collections}
          storeName={storeName}
          isCommercePage={isCommercePage}
          productTypes={productTypes}
          productTypeSlugs={productTypeSlugs}
        />
        {/* eslint-disable-next-line @shopify/jsx-prefer-fragment-wrappers */}
        <div>
          <Cart />
        </div>
        <main role="main" id="mainContent">
          {hero}
          {/* <div className="mx-auto max-w-7xl p-4 md:py-5 md:px-8"> */}
          <div className="page__body">{children}</div>
        </main>
        <Footer collection={collections[0]} product={products[0]} />
      </div>
    </>
  );
}

const QUERY = gql`
  query indexContent($numCollections: Int!) {
    shop {
      name
    }
    collections(first: $numCollections) {
      edges {
        node {
          description
          handle
          id
          title
          image {
            ...ImageFragment
          }
        }
      }
    }
    products(first: 1) {
      edges {
        node {
          handle
        }
      }
    }
    productTypes(first: 10) {
      edges {
        node
      }
    }
  }
  ${Image.Fragment}
`;
