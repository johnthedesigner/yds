// import {Link} from '@shopify/hydrogen/client';
import Link from "next/link";

import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import Pingpong from "../../components/Pingpong";
import Bumper from "../../components/Bumper";
import pages from "../../utils/pages";
import NewSeo from "../../components/NewSeo";

const Membership = () => {
  return (
    <Layout
      hero={<Hero title="Membership" image="/flowers.jpg" />}
      isCommercePage={false}>
      <NewSeo page={pages.membership} />
      <Pingpong
        side="left"
        image="/digging-tubers.jpg"
        imageAlt="Dahlia plants being dug up with a pitchfork"
        ratioWidth="1"
        ratioHeight="1">
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
        <Link href="/membership/join">
          <a className="button" title="Membership Signup Page">
            Join Y.D.S. Today!
          </a>
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
        imageAlt="Dahlia tubers ready to be divided">
        <h3>Visitors Welcome!</h3>
        <p>
          Are you interested in learning more about dahlias and curious about
          joining a local dahlia club? We welcome you to join us for your first
          two meetings<span className="required">**</span> before you decide to
          take the plunge and join the club. Please{" "}
          <Link href="/contact">
            <a title="Contact us">drop us a line through the contact form</a>
          </Link>{" "}
          so we know you are coming!
        </p>
        <p style={{ lineHeight: "1.125em", margin: "1rem 0" }}>
          <small>
            <em>
              YDS membership required for meetings notated as a Special Event.
              We invite you to join us by registering on our{" "}
              <Link href="/membership/join">
                <a>Membership page</a>
              </Link>
              .
            </em>
          </small>
        </p>
        <Link href="/meetings">
          <a title="Explore Meetings & Events" className="button">
            Explore Meetings & Events
          </a>
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
