import Layout from '../components/Layout.server';
import Hero from '../components/Hero.server';
import {
  CompactText,
  CompactTextWrapper,
} from '../components/CompactText.server';
import ContactForm from '../components/ContactForm.client';

const Contact = ({response}) => {
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
      hero={<Hero title="Contact Us" image="/macro-dahlia.jpg" />}
      isCommercePage={false}
    >
      <CompactTextWrapper>
        <CompactText>
          <h3>Have questions, ideas or would like to get involved?</h3>
          <p>
            Are you new to growing dahlias and have some questions? The best way
            to learn is by becoming a member.
          </p>
          <p>
            It takes a village to run a club and if you have a little time
            please reach out to us because we would greatly appreciate any time
            you have to support the club.
          </p>
          <a
            href="http://instagram.com/yankeedahliasociety"
            className="footer__social-icon"
            title="Yankee Dahlia Society on Instagram"
            target="_blank"
          >
            <img src="/ig.svg" />
          </a>
          <a
            href="http://facebook.com/yankeedahliasociety"
            className="footer__social-icon"
            title="Yankee Dahlia Society on Facebook"
            target="_blank"
          >
            <img src="/fb.svg" />
          </a>
        </CompactText>
        <CompactText>
          <h3>Contact Us</h3>
          <ContactForm />
        </CompactText>
      </CompactTextWrapper>
    </Layout>
  );
};

export default Contact;
