import {Link} from '@shopify/hydrogen/client';

import Layout from '../components/Layout.server';
import Hero from '../components/Hero.server';
import Pingpong from '../components/Pingpong.server';
import Bumper from '../components/Bumper.server';

const Tubers = ({response}) => {
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

  return (
    <Layout
      hero={<Hero title="Our Tubers" image="/dividing-dahlias.jpg" />}
      isCommercePage={false}
    >
      <Pingpong
        side="left"
        image="/tubers.jpg"
        imageAlt="Dahlia tubers ready to be divided"
      >
        <h3>Preparing for Our Inaugural Tuber Sale in 2022</h3>
        <p>
          Naturally a dahlia club needs dahlias to support club activities and
          education.
        </p>
        <p>
          We have a plan to grow our tuber stock through our Growing Partners
          for the 2021 season so we can have a huge sale in 2022. Spring tuber
          sales provide a major source of funding for club activities while
          being a great source for members to have access to tubers for sale.
          Over the last several months our founders have personally supported
          the purchase of nearly 500 tubers from growers around the US and in
          addition contributed more than 100 tubers from their personal
          collections. We look forward to having over 200 varieties to offer for
          our first sale in 2022.
        </p>
        <p>
          Yankee Dahlia Society has connected with several Growing Partners who
          generously share their extra growing space to grow dahlia plants and
          tubers for the club. YDS supplies the tubers to our growing partner
          and in exchange our Growing Partner gets the cut flowers during the
          season to do with as they wish while the club gets the tubers at the
          end of the season.
        </p>
        <p>
          Do you have extra space to grow Y.D.S. tubers? If so, we'd love to
          talk with you about growing partnerships.
        </p>
        <Link
          className="button"
          title="Contact Us About Growing Partnerships"
          to="/contact"
        >
          Contact Us About Growing Partnerships
        </Link>
      </Pingpong>
      <Bumper
        text="Interested in Tuber Sales & Swaps? Become a Member to Get Updates!"
        buttonUrl="/membership"
        buttonLabel="Membership Info"
      />
    </Layout>
  );
};

export default Tubers;
