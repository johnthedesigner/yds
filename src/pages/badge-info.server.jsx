import {Link} from '@shopify/hydrogen/client';

import Layout from '../components/Layout.server';
import Hero from '../components/Hero.server';
import Bumper from '../components/Bumper.server';
import Pingpong from '../components/Pingpong.server';

const BadgeInfo = () => {
  return (
    <Layout
      hero={<Hero title="Y.D.S. Membership Badge" image="/flowers.jpg" />}
      isCommercePage={false}
    >
      <Bumper text="How to use the Y.D.S. membership badge" />
      <Pingpong
        side="right"
        image="/badge-colors.jpg"
        imageAlt="Dahlia plants being dug up with a pitchfork"
        ratioWidth="1"
        ratioHeight="1"
      >
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
        ratioHeight="1"
      >
        <h3>Please link to our homepage.</h3>
        <p>
          Let people know <a href="/">where to go</a> to find out more about
          Y.D.S.
        </p>
      </Pingpong>
      <Pingpong
        side="right"
        image="/badges.jpg"
        imageAlt="Dahlia plants being dug up with a pitchfork"
        ratioWidth="1"
        ratioHeight="1"
      >
        <h3>Download Y.D.S. badges for your website</h3>
        <p>
          We’ve got a variety of formats, colors and resolutions to suit your
          own website or marketing materials. If you have any questions, please
          email us at{' '}
          <a href="mailto:info@yankeedahliasociety.com">
            info@yankeedahliasociety.com
          </a>
          .
        </p>
        <Link
          to="/badge-info"
          href="https://drive.google.com/drive/folders/1Icruo22IOFhDubVIUvofXgLK998S5vEG?usp=sharing"
          target="_blank"
          className="button"
        >
          Download Here
        </Link>
      </Pingpong>
    </Layout>
  );
};

export default BadgeInfo;
