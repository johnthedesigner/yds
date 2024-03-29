import Link from "next/link";

import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Bumper from "../components/Bumper";
import Pingpong from "../components/Pingpong";
import NewSeo from "../components/NewSeo";
import pages from "../utils/pages.json";

const BadgeInfo = () => {
  return (
    <Layout
      hero={<Hero title="Y.D.S. Membership Badge" image="/flowers.jpg" />}
      isCommercePage={false}>
      <NewSeo page={pages.badgeInfo} />
      <Bumper text="How to use the Y.D.S. membership badge" />
      <Pingpong
        side="right"
        image="/badge-colors.jpg"
        imageAlt="Dahlia plants being dug up with a pitchfork"
        ratioWidth="1"
        ratioHeight="1">
        <h3>Please don’t change the colors.</h3>
        <p>
          We included the badge in colors that should work on either light or
          dark backgrounds, and a transparent version as well.
        </p>
      </Pingpong>
      <Pingpong
        side="right"
        image="/homepage.jpg"
        imageAlt="Dahlia plants being dug up with a pitchfork"
        ratioWidth="1"
        ratioHeight="1">
        <h3>Please link to our homepage.</h3>
        <p>
          Let people know{" "}
          <Link href="/">
            <a>where to go</a>
          </Link>{" "}
          to find out more about Y.D.S.
        </p>
      </Pingpong>
      <Pingpong
        side="right"
        image="/badges.jpg"
        imageAlt="Dahlia plants being dug up with a pitchfork"
        ratioWidth="1"
        ratioHeight="1">
        <h3>Download Y.D.S. badges for your website</h3>
        <p>
          We’ve got a variety of formats, colors and resolutions to suit your
          own website or marketing materials. If you have any questions, please
          email us at{" "}
          <a href="mailto:info@yankeedahliasociety.com">
            info@yankeedahliasociety.com
          </a>
          .
        </p>
        <Link href="https://drive.google.com/drive/folders/1Icruo22IOFhDubVIUvofXgLK998S5vEG?usp=sharing">
          <a className="button" target="_blank">
            Download Here
          </a>
        </Link>
      </Pingpong>
    </Layout>
  );
};

export default BadgeInfo;
