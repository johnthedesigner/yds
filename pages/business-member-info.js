import Link from "next/link";

import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Pingpong from "../components/Pingpong";
import Bumper from "../components/Bumper";
import NewSeo from "../components/NewSeo";
import pages from "../utils/pages.json";

const BusinessMemberInfo = () => {
  return (
    <Layout
      hero={
        <Hero
          title="Get the most out of your business membership."
          image="/flowers.jpg"
        />
      }
      isCommercePage={false}>
      <NewSeo page={pages.businessMembershipInfo} />
      <Pingpong
        side="right"
        image="/biz-member-listing.jpg"
        imageAlt="Dahlia plants being dug up with a pitchfork"
        ratioWidth="1"
        ratioHeight="1">
        <h3>Send us your logo and a link to your website</h3>
        <p>
          We’re proud to list our business members{" "}
          <a href="https://www.yankeedahliasociety.com">on our website</a>, so
          send us your logo and website soon and we can start telling everyone
          about you. Email{" "}
          <Link href="mailto:info@yankeedahliasociety.com">
            <a>info@yankeedahliasociety.com</a>
          </Link>
          .
        </p>
      </Pingpong>
      <Pingpong
        side="left"
        image="/badges.jpg"
        imageAlt="Dahlia plants being dug up with a pitchfork"
        ratioWidth="1"
        ratioHeight="1">
        <h3>
          Let people know you’re a proud Y.D.S. member, put our badge on your
          website.
        </h3>
        <p>
          Check out our logos & badges usage page to grab a badge image and
          check out how to show off your new Y.D.S. membership!
        </p>
        <Link href="/badge-info">
          <a className="button">Get a Y.D.S. Badge</a>
        </Link>
      </Pingpong>
      <Pingpong
        side="right"
        image="/get-involved.jpg"
        imageAlt="Dahlia plants being dug up with a pitchfork"
        ratioWidth="1"
        ratioHeight="1">
        <h3>Look for opportunites to get involved.</h3>
        <p>
          We’ve got all sorts of opportunities to get involved in upcoming
          events. Sponsor prizes in our holiday raffle, host a club meeting, be
          one of our feature speakers, and other great ways to engage with our
          members.
        </p>
        <Link href="/get-involved">
          <a className="button">Get Involved</a>
        </Link>
      </Pingpong>
      <Pingpong
        side="left"
        image="/group-photo.jpg"
        imageAlt="Dahlia plants being dug up with a pitchfork"
        ratioWidth="1"
        ratioHeight="1">
        <h3>Come to our next meeting!</h3>
        <p>
          Come join the fun and add your energy and expertise to our full
          calendar of fun virtual and in-person meetings.
        </p>
        <Link href="/meetings">
          <a className="button">Explore Meetings & Events</a>
        </Link>
      </Pingpong>
      <Pingpong
        side="right"
        image="/growing-partners.jpg"
        imageAlt="Dahlia plants being dug up with a pitchfork"
        ratioWidth="1"
        ratioHeight="1">
        <h3>Learn more about our Growing Partnerships.</h3>
        <p>
          Have land in need of tubers? Grow some for Y.D.S. and enjoy all the
          cut flowers you can grow. At the end of the season we sell the tubers
          to raise much-needed funds for Y.D.S.! Email{" "}
          <Link href="mailto:info@yankeedahliasociety.com">
            <a>info@yankeedahliasociety.com</a>
          </Link>{" "}
          to find out more.
        </p>
      </Pingpong>
      <Bumper
        text="Reach out to inquire about opportunities to get involved"
        buttonUrl="/contact"
        buttonLabel="Get in Touch"
      />
    </Layout>
  );
};

export default BusinessMemberInfo;
