import {Link} from '@shopify/hydrogen/client';

import Layout from '../../components/Layout.server';
import Hero from '../../components/Hero.server';
import Pingpong from '../../components/Pingpong.server';
import Bumper from '../../components/Bumper.server';
import pages from '../../pages';
import NewSeo from '../../components/NewSeo.client';

const Membership = ({response}) => {
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
      hero={<Hero title="Membership" image="/flowers.jpg" />}
      isCommercePage={false}
    >
      <NewSeo page={pages.membership} />
      <Pingpong
        side="left"
        image="/digging-tubers.jpg"
        imageAlt="Dahlia plants being dug up with a pitchfork"
        ratioWidth="1"
        ratioHeight="1"
      >
        <h3>
          <b>We want you!</b> for Yankee Dahlia Society
        </h3>
        <p>
          We are a dahlia club based in Worcester and Middlesex counties in
          Massachusetts and invite dahlia growers all throughout the New England
          area and beyond. Our club is a proud member of the American Dahlia
          Society, grateful that they support research and education about our
          favorite flower along with connecting and supporting dahlia clubs and
          dahlia growers across the country and around the world.
        </p>
        <p>
          We would love to get to know you. Whether you are new to growing
          dahlias or an experienced dahlia grower, Yankee Dahlia Society has
          something for everyone. So if you love dahlias and love people and
          would enjoy spending time learning and sharing knowledge about growing
          and showing dahlias then join our club!
        </p>
        <p>
          We will have monthly email newsletters, member meetings, garden tours,
          presentations, and lots of opportunities for hands-on learning about
          all things dahlias.
        </p>
        <Link
          className="button"
          title="Membership Signup Page"
          to="/membership/join"
        >
          Join Y.D.S. Today!
        </Link>
      </Pingpong>
      <Bumper
        text="We're grateful for our long list of member businesses."
        smallText="Our business members are knowledgeable, engaged members of the New England dahlia growing community and we're so glad to have them as members and in our meetings."
        buttonUrl="/business-members"
        buttonLabel="See Our Member Businesses"
      />
      <Pingpong
        side="right"
        image="/root-ball.jpg"
        imageAlt="Dahlia tubers ready to be divided"
      >
        <h3>Visitors Welcome!</h3>
        <p>
          Are you interested in learning more about dahlias and curious about
          joining a local dahlia club? We welcome you to join us for your first
          two meetings before you decide to take the plunge and join the club.
          Please{' '}
          <Link title="Contact us" to="/contact">
            drop us a line through the contact form
          </Link>{' '}
          so we know you are coming!
        </p>
        <Link
          className="button"
          title="Explore Meetings & Events"
          to="/meetings"
        >
          Explore Meetings & Events
        </Link>
      </Pingpong>
      <Bumper
        text="It takes a village! Already a member and interested in lending an extra hand to the club?"
        buttonUrl="/get-involved"
        buttonLabel="How to Get More Involved"
      />
    </Layout>
  );
};

export default Membership;
