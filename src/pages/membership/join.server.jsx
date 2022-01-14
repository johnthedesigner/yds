import Layout from '../../components/Layout.server';
import Hero from '../../components/Hero.server';
import {
  CompactText,
  CompactTextWrapper,
} from '../../components/CompactText.server';
import MembershipForm from '../../components/MembershipForm.client';
import NewSeo from '../../components/NewSeo.client';
import pages from '../../pages.json';

const Join = ({response}) => {
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
      hero={<Hero title="Join Yankee Dahlia Society" image="/flowers.jpg" />}
      isCommercePage={false}
    >
      <NewSeo page={pages.join} />
      <CompactTextWrapper>
        <CompactText>
          <h3>WE WANT YOU for Yankee Dahlia Society!</h3>
          <p>
            Sign up now and receive an extended membership for your first year.
            Our membership year normally runs from August 1 through July 31.
            Join anytime between now and August 1, and your membership will
            remain valid through July 31, 2022. It’s a great time to join us as
            we launch!
          </p>
        </CompactText>
        <CompactText>
          <MembershipForm />
        </CompactText>
      </CompactTextWrapper>
    </Layout>
  );
};

export default Join;
