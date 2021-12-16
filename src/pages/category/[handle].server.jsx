import {
  MediaFileFragment,
  ProductProviderFragment,
  useShopQuery,
  flattenConnection,
  RawHtml,
} from '@shopify/hydrogen';
import {useParams} from 'react-router-dom';
import gql from 'graphql-tag';

import LoadMoreProducts from '../../components/LoadMoreProducts.client';
import Layout from '../../components/Layout.server';
import ProductCard from '../../components/ProductCard.server';
import NotFound from '../../components/NotFound.server';

const productTypesMap = {
  'gift-cards': 'Gift Cards',
  supplies: 'Supplies',
  tubers: 'Tubers',
};

export default function Collection({
  country = {isoCode: 'US'},
  collectionProductCount = 24,
}) {
  const {handle} = useParams();

  console.log(productTypesMap[handle]);

  const {data} = useShopQuery({
    query: QUERY(handle),
    variables: {
      handle,
      country: country.isoCode,
      numProducts: collectionProductCount,
    },
  });

  if (data?.products == null) {
    return <NotFound />;
  }

  const products = data ? flattenConnection(data.products) : [];
  const hasNextPage = data.products.pageInfo.hasNextPage;

  return (
    <Layout>
      {products.map((product) => {
        console.log(product);
        return <ProductCard product={product} />;
      })}
    </Layout>
  );
}

const QUERY = (handle) => {
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
    products(first: 24, query: "product_type:${productTypesMap[handle]}") {
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
