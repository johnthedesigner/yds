import Layout from '../../components/Layout.server';
import Hero from '../../components/Hero.server';
import {
  CompactText,
  CompactTextWrapper,
} from '../../components/CompactText.server';
import MembershipForm from '../../components/MembershipForm.client';

const Join = () => {
  return (
    <Layout
      hero={<Hero title="Join Yankee Dahlia Society" image="/flowers.jpg" />}
      isCommercePage={false}
    >
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
