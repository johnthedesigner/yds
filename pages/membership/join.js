import _ from "lodash";

import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import { CompactText, CompactTextWrapper } from "../../components/CompactText";
import MembershipForm from "../../components/MembershipForm";
import NewSeo from "../../components/NewSeo";
import pages from "../../utils/pages.json";
import { getProductByHandle } from "../../utils/shopify";
// import NotFound from "../../components/NotFound";

const Join = ({ ydsMembershipProduct, donationProduct }) => {
  // If there is no yds membership available, show "not found"
  if (!ydsMembershipProduct) {
    // return <NotFound />; // TODO: Find out if this is actually helping
    return null;
  }

  return (
    <Layout
      hero={<Hero title="Join Yankee Dahlia Society" image="/flowers.jpg" />}
      isCommercePage={false}>
      <NewSeo page={pages.join} />
      <CompactTextWrapper>
        <CompactText>
          <h3>WE WANT YOU for Yankee Dahlia Society!</h3>
          <p>{ydsMembershipProduct.description}</p>
          <MembershipForm
            ydsMembershipProduct={ydsMembershipProduct}
            donationProduct={donationProduct}
          />
        </CompactText>
      </CompactTextWrapper>
    </Layout>
  );
};

// Fetch membership products for server side rendering
export const getServerSideProps = async (ctx) => {
  let ydsMembershipProduct = await getProductByHandle(
    "yds-annual-membership-2023-2026"
  );
  let donationProduct = await getProductByHandle("membership-donation");

  return { props: { ydsMembershipProduct, donationProduct } };
};

export default Join;
