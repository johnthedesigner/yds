import _ from "lodash";
import Image from "next/image";

import Layout from "../components/Layout";
import Hero from "../components/Hero";
import FundraiserForm from "../components/FundraiserForm";
import NewSeo from "../components/NewSeo";
import pages from "../utils/pages.json";
import { getProductByHandle } from "../utils/shopify";

const Fundraiser = ({ fundraiserProduct }) => {
  if (!fundraiserProduct) {
    return null;
  }

  return (
    <Layout
      hero={
        <Hero
          title="Yankee Dahlia Society Fundraiser"
          image="/supplies-header.jpg"
          height="40vh"
        />
      }
      isCommercePage={false}>
      <NewSeo page={pages.fundraiser} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(275px, 1fr))",
          width: "70rem",
          maxWidth: "90vw",
          margin: "0 auto",
          padding: "3rem 0",
          direction: "rtl",
        }}>
        <div style={{ padding: "2rem", direction: "ltr" }}>
          <h3>We&apos;re Grateful for Your Donation</h3>
          <FundraiserForm fundraiserProduct={fundraiserProduct} />
        </div>
        <div style={{ padding: "2rem", direction: "ltr" }}>
          <Image
            src="/frog.jpg"
            width="1"
            height="1"
            layout="responsive"
            style={{ marginBottom: "3rem" }}
            alt="A floral frog in the bottom of a vase"
          />
          <h3>Fundraiser for Floral Exhibit Supplies</h3>
          <p style={{ margin: "1rem 0", fontSize: "1.25rem" }}>
            Yankee Dahlia Society (YDS) is a new dahlia club founded in January
            2021 and based in Massachusetts, with members from all over the New
            England region and beyond. We are a club committed to sharing the
            joy of growing dahlias with members and the greater community
            through education and outreach events that promote appreciation for
            and interest in these beautiful flowers.
          </p>
          <p style={{ margin: "1rem 0", fontSize: "1.25rem" }}>
            YDS is planning to hold our 2nd annual Dahlia Exhibit open to the
            public on September 30 - October 1, 2023 at Spence Farm @ Hurld
            Wyman Elementary School in Woburn MA. We will have on display
            hundreds of beautiful dahlia blooms grown by YDS members and
            non-members alike for the public to enjoy. In addition, we will have
            floral design and growing presentations to inspire and educate
            people to grow and learn more about dahlias.
          </p>
          <p style={{ margin: "1rem 0", fontSize: "1.25rem" }}>
            As a new club just over two years old, we need to purchase floral
            exhibit supplies and floral containers to provide for our Dahlia
            Exhibits now and for years to come. We would like our Dahlia Exhibit
            to be environmentally friendly, and want to use display supplies
            that can be reused year after year. Since floral foam cannot be
            reused, recycled or readily composted, YDS has decided to make our
            Dahlia Exhibit a floral foam free event. Instead, we will use metal
            floral pin frogs and chicken wire to support our blooms in reusable
            display containers.
          </p>
          <p style={{ margin: "1rem 0", fontSize: "1.25rem" }}>
            We will need to purchase floral pin frogs, chicken wire and 560
            display containers to create a beautiful and educational display of
            dahlia blooms for all to enjoy now and in the future. The cost for
            display supplies needed for this year&apos;s event is estimated at
            $2,500.00 and in addition we have projected our annual show expenses
            at $2,500.00.
          </p>
          <p style={{ margin: "1rem 0", fontSize: "1.25rem" }}>
            Please help us reach our goal of raising $5,000.00 for our bloom
            display supplies and the 2023 YDS Dahlia Bloom Exhibit expenses. We
            appreciate your support to help us reach our goal. Thank you for
            your donation! Be sure to save the date for September 30 - October
            1, 2023. We hope to see you at the YDS Dahlia Bloom Exhibit in the
            fall.
          </p>
        </div>
      </div>
    </Layout>
  );
};

// Fetch fundraiser product for server side rendering
export const getServerSideProps = async (ctx) => {
  let fundraiserProduct = await getProductByHandle("fundraising-donation");

  return { props: { fundraiserProduct } };
};

export default Fundraiser;
