import Link from "next/link";

import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Pingpong from "../components/Pingpong";
import Bumper from "../components/Bumper";
import HomeEventBlock from "../components/HomeEventBlock";
import NewSeo from "../components/NewSeo";
import pages from "../utils/pages.json";

const Index = () => {
  return (
    <Layout
      hero={
        <Hero
          title="Yankee Dahlia Society"
          image="/purple-flowers.jpg"
          overlay="false"
          height="40vh"
        />
      }
      isCommercePage={false}>
      <NewSeo page={pages.home} />
      <Pingpong
        side="left"
        image="planting-dahlias.jpg"
        imageAlt="A garden with rows of dahlias being planted"
        ratioWidth={1}
        ratioHeight={1.5}>
        <h3>
          <b>We want you!</b> for Yankee Dahlia Society!
        </h3>
        <p>
          YDS Memberships are available today for both individual and business
          members. Register soon to attend your first meeting!
        </p>
        <Link href="/membership">
          <a
            className="button button--homepage"
            title="Find out more about YDS memberships">
            Find out more
          </a>
        </Link>
        <HomeEventBlock />
      </Pingpong>
      <Bumper
        text="Already a member and looking for ways to lend a hand within Yankee Dahlia Society?"
        buttonUrl="/get-involved"
        buttonLabel="More Ways to Get Involved"
      />
    </Layout>
  );
};

export default Index;
