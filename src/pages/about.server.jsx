import Layout from '../components/Layout.server';
import Hero from '../components/Hero.server';
import Pingpong from '../components/Pingpong.server';
import Bumper from '../components/Bumper.server';
// import pages from '../../pages.json';

const About = ({response}) => {
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
      hero={
        <Hero title="About Yankee Dahlia Society" image="/purple-flowers.jpg" />
      }
      isCommercePage={false}
    >
      <div>
        <Pingpong
          side="left"
          image="/misty-carol.jpg"
          imageAlt="Misty and Carol, founders of Yankee Dahlia Society"
        >
          <h3>Our Background</h3>
          <p>
            Hi, we’re Misty and Carol, two friends who met growing dahlias. So,
            when two friends who love dahlias want to make other new friends who
            also love dahlias, they start a club!
          </p>
          <p>
            We had a vision of creating a fun space where people who love
            dahlias could gather and connect, in person and through social
            media, to learn, have fun, and enjoy growing dahlias together.
          </p>
        </Pingpong>
        <Pingpong
          side="right"
          image="/garden.jpg"
          imageAlt="A garden full of dahlias"
        >
          <h3>Member of the American Dahlia Society</h3>
          <p>
            Yankee Dahlia Society is a proud member of the American Dahlia
            Society. Since 1915 the American Dahlia Society has been made up of
            local chapters around the United States and Canada. Today over 70
            clubs are affiliated with ADS and their mission to stimulate
            interest while promoting the culture and the development of the
            dahlia. YDS looks forward to participating with ADS and the dahlia
            club community to enrich and share our dahlia knowledge and connect
            with growers across the country.
          </p>
        </Pingpong>
        <Bumper
          text="Does this sound like fun to you too?"
          buttonUrl="/membership"
          buttonLabel="Find out more about YDS membership"
        />
      </div>
    </Layout>
  );
};

export default About;
