import {Link} from '@shopify/hydrogen/client';

import Layout from '../components/Layout.server';
import Hero from '../components/Hero.server';
import Pingpong from '../components/Pingpong.server';
import Bumper from '../components/Bumper.server';
import HomeEventBlock from '../components/HomeEventBlock.client';

const Index = ({response}) => {
  response.cache({
    // Cache the page for one hour.
    // maxAge: 60 * 60,
    maxAge: 0,
    // Serve the stale page for up to 23 hours while getting a fresh response in the background.
    // staleWhileRevalidate: 23 * 60 * 60,
    staleWhileRevalidate: 0,
    // cache-control no-cache
    cacheControl: 'No-Cache',
  });

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
      isCommercePage={false}
    >
      <Pingpong
        side="left"
        image="planting-dahlias.jpg"
        imageAlt="A garden with rows of dahlias being planted"
        ratioWidth={1}
        ratioHeight={1.5}
      >
        <h3>
          <b>We want you!</b> for Yankee Dahlia Society!
        </h3>
        <p>
          YDS Memberships are available today for both individual and business
          members. Register soon to attend our first meeting!
        </p>
        <Link
          to="/membership"
          className="button"
          title="Find out more about YDS memberships"
        >
          Find out more
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
