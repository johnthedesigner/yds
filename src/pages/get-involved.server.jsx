import {Link} from '@shopify/hydrogen/client';

import Layout from '../components/Layout.server';
import Hero from '../components/Hero.server';
import Bumper from '../components/Bumper.server';
import {
  CompactText,
  CompactTextWrapper,
} from '../components/CompactText.server';

const GetInvolved = ({response}) => {
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
      hero={<Hero title="Get Involved" image="/garden.jpg" />}
      isCommercePage={false}
    >
      <Bumper
        text="Want to get more involved in Y.D.S.? Get in touch, we'd love to talk about opportunities to help with meetings, newsletters, garden tours and more."
        smallText="Time is our most valued asset.  We appreciate any amount of time you can contribute because running a successful club takes many hands, especially when it’s a brand new club.  If you would like to be at the forefront of making this club happen as a contributing member we welcome the assistance and expertise you can share.  Please see below ways to get involved.  Reach out to us via our contact form if you have any special skills or ideas on ways you can get involved."
        buttonUrl="/contact"
        buttonLabel="Get in Touch"
      />
      <CompactTextWrapper>
        <CompactText>
          <h3>Speakers Wanted</h3>
          <p>
            Every gardener knows that every other gardener has their own unique
            growing methods. We’ve all gained our own first-hand experience,
            learned from the mistakes we’ve made and we all have had tons of
            questions along the way. What we learn from each other is priceless.
            Our shared knowledge within the club creates friendships and makes
            us better dahlia growers. Reach out if you would like to share your
            own gardening experience with us.
          </p>
        </CompactText>
        <CompactText>
          <h3>Garden Tours Wanted</h3>
          <p>
            We would love to see your garden in person or even virtually. If you
            are local we would love to arrange a safe outdoor socially distant
            experience or even a pre-recorded tour. For those across the world
            we would love to try a live or pre-recorded virtual tour.
          </p>
        </CompactText>
        <CompactText>
          <h3>Extra Set of Hands</h3>
          <p>
            Would you have a little extra time you can spare and would like to
            help the club at one of our Growing Partner Locations (Maplebrook
            Farm in Sterling, MA or at Wright-Locke Farm in Winchester, MA).
            Seasonally we could use some help with tasks to plant tubers, stake
            growing plants, dig tubers or divide tubers. Please reach out to let
            us know that you would like to help.
          </p>
        </CompactText>
        <CompactText>
          <h3>Do you like to write articles?</h3>
          <p>
            Would you have extra time to put together articles to be included in
            our Monthly Emails. Possibly you would like to work with others and
            write a column in our monthly newsletters. Ideas include:
            <ul>
              <li>American Dahlia Society Quarterly Bulletins</li>
              <li>
                Content Ideas for the Monthly Newsletter:
                <ul>
                  <li>Ask The Expert</li>
                  <li>Feature a YDS Member</li>
                  <li>Seasonal Tips</li>
                  <li>Meeting Recaps</li>
                </ul>
              </li>
            </ul>
          </p>
        </CompactText>
        <Bumper
          text="Reach out to inquire about opportunities to get involved"
          buttonUrl="/contact"
          buttonLabel="Get in Touch"
        />

        <CompactText>
          <h3>Become a Growing Partner</h3>
          <p>
            For our members that have some open space (small or large) and would
            like to grow some dahlias for the club. The club will buy and supply
            the tubers. The partner grower grows and maintains the plants and
            keeps the cut flowers through the season to do with as they wish,
            while the club gets the tubers at the end of the season. Each grower
            determines how many they would like to grow for the club. Growing
            dahlias for tubers each season is a major source of funding for the
            club’s programs through the year.
          </p>
          <Link
            to="/contact"
            className="button"
            title="Fill Out Our Contact Form to Inquire"
          >
            Fill Out Our Contact Form to Inquire
          </Link>
        </CompactText>
      </CompactTextWrapper>
    </Layout>
  );
};

export default GetInvolved;
