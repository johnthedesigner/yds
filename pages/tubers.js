import Link from "next/link";

import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Pingpong from "../components/Pingpong";
import Bumper from "../components/Bumper";
import NewSeo from "../components/NewSeo";
import pages from "../utils/pages.json";

const Tubers = () => {
  return (
    <Layout
      hero={<Hero title="Our Tubers" image="/dividing-dahlias.jpg" />}
      isCommercePage={false}>
      <NewSeo page={pages.tubers} />
      <Pingpong
        side="left"
        image="/tubers.jpg"
        imageAlt="Dahlia tubers ready to be divided">
        <h3>Preparing for Our 2023 Tuber Sale</h3>
        <p>
          Locally grown dahlias! We have dahlia tubers grown in Massachusetts by
          Yankee Dahlia Society members & Growing Partners.
        </p>
        <p>
          We are fortunate to have several Growing Partners each year that we
          have worked with to grow dahlias and tuber stock for the annual club
          tuber sale. Our Growing Partners share their extra growing space to
          grow dahlia plants and tubers for the club. YDS supplies the tubers to
          our growing partner and in exchange our Growing Partner gets the cut
          flowers during the season to do with as they wish while the club gets
          the tubers at the end of the season.
        </p>
        <p>
          Tuber sales provide a good source of club funding: supporting club
          programming and activities while being a great source for members to
          have access to tubers for sale. Your purchases directly support YDS
          and are a vital part of our club! We are looking forward to our third
          annual club tuber sale in the new year. This season we grew lots of
          wonderful varieties and look forward to offering them first to our
          club members.
        </p>
        <p>
          Join YDS, get access to our tuber sale, enjoy wonderful club
          programming and make friends. The YDS Tuber sale goes live early
          January 2024. Join today to get details.
        </p>
        <p>
          Do you have extra space to grow Y.D.S. tubers? If so, we&apos;d love
          to talk with you about growing partnerships.
        </p>
        <Link href="/contact">
          <a className="button" title="Contact Us About Growing Partnerships">
            Contact Us About Growing Partnerships
          </a>
        </Link>
      </Pingpong>
      <Bumper
        text="Interested in Tuber Sales & Making more Dahlia Friends? Become a Member to Get Updates!"
        buttonUrl="/membership"
        buttonLabel="Membership Info"
      />
    </Layout>
  );
};

export default Tubers;
