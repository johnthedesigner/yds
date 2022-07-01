import _ from 'lodash';
import {useShopQuery} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import Layout from '../../components/Layout.server';
import Hero from '../../components/Hero.server';
import {
  CompactText,
  CompactTextWrapper,
} from '../../components/CompactText.server';
import MembershipForm from '../../components/MembershipForm.client';
import NewSeo from '../../components/NewSeo.client';
import pages from '../../pages.json';
import NotFound from '../../components/NotFound.client';

const Register = ({response}) => {
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

  // Membership & donation product handles
  const ydsMembershipHandle = 'yds-annual-membership-2022-2023';
  const adsMembershipHandle = 'ads-annual-membership-2022';
  const donationHandle = 'membership-donation';

  // Fetch any product by handle
  const getProductByHandle = (handle) => {
    let productQuery = useShopQuery({
      query: QUERY(handle),
    });
    let productData = productQuery.data;
    return productData ? productData.productByHandle : [];
  };

  // Fetch membership and donation products from shopify
  let ydsMembershipProduct = getProductByHandle(ydsMembershipHandle);
  let adsMembershipProduct = getProductByHandle(adsMembershipHandle);
  let donationProduct = getProductByHandle(donationHandle);

  // If there is no yds membership available, show "not found"
  if (!ydsMembershipProduct) {
    return <NotFound />;
  }

  return (
    <Layout
      hero={<Hero title="Join Yankee Dahlia Society" image="/flowers.jpg" />}
      isCommercePage={false}
    >
      <NewSeo page={pages.join} />
      <CompactTextWrapper>
        <CompactText>
          <h3>WE WANT YOU for Yankee Dahlia Society!</h3>
          <p>{ydsMembershipProduct.description}</p>
        </CompactText>
        <CompactText>
          <MembershipForm
            ydsMembershipProduct={ydsMembershipProduct}
            adsMembershipProduct={adsMembershipProduct}
            donationProduct={donationProduct}
          />
        </CompactText>
      </CompactTextWrapper>
    </Layout>
  );
};

const QUERY = (productHandle) => {
  return gql`
    query currentMembership {
      productByHandle(handle: "${productHandle}") {
            description
            handle
            vendor
            title
            totalInventory
            tags
            options(first: 10) {
                name
                values
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
  `;
};

export default Register;
