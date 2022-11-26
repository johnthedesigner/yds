import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Pingpong from "../components/Pingpong";
import Bumper from "../components/Bumper";
import NewSeo from "../components/NewSeo";
import pages from "../utils/pages.json";
import Link from "next/link";

const About = () => {
  return (
    <Layout
      hero={
        <Hero title="About Yankee Dahlia Society" image="/purple-flowers.jpg" />
      }
      isCommercePage={false}>
      <NewSeo page={pages.about} />
      <div>
        <Pingpong
          side="left"
          image="/misty-carol.jpg"
          imageAlt="Misty and Carol, founders of Yankee Dahlia Society">
          {/* <h3>Our Background</h3> */}
          <p>
            Yankee Dahlia Society was established in 2021. Co-Founders and
            Co-Presidents Misty and Carol are two friends who met growing
            dahlias. So, when two friends who love dahlias want to make other
            new friends who also love dahlias, they start a club!
          </p>
          <p>
            We had a vision of creating a fun space where people who love
            dahlias could gather and connect, in person and through social
            media, to learn, have fun, and enjoy growing dahlias together.
          </p>
          <p>
            We are a vibrant dahlia club with wonderful members who love growing
            dahlias. Whether you are a new dahlia grower or have years of
            experience we would love to get to know you. Join the club and be
            part of the fun!
          </p>
          <p>
            <em>
              <small>
                Misty Florez & Carol Palmer
                <br />
                Co-Founders & Co-Presidents
              </small>
            </em>
          </p>
        </Pingpong>
        <Pingpong
          side="right"
          image="/ads-group.jpg"
          imageAlt="Group photo from the 2022 ADS National Show">
          <h3>Member of the American Dahlia Society</h3>
          <p>
            Yankee Dahlia Society is a proud member of the American Dahlia
            Society. Since 1915 the American Dahlia Society has been made up of
            local chapters around the United States and Canada. Today over 60
            clubs are affiliated with ADS and their mission to stimulate
            interest while promoting the culture and the development of the
            dahlia. YDS looks forward to participating with ADS and the dahlia
            club community to enrich and share our dahlia knowledge and connect
            with growers across the country. We encourage our members to also
            join ADS. Learn more about ADS
          </p>
          {/* <Link href="/ads-membership">
            <a className="button" title="About the American Dahlia Society">
              About the ADS
            </a>
          </Link> */}
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
