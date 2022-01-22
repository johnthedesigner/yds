import Layout from '../components/Layout.server';
import Hero from '../components/Hero.server';
import ShowList from '../components/ShowList.client';
import NewSeo from '../components/NewSeo.client';
import pages from '../pages.json';
import Bumper from '../components/Bumper.server';

const Shows = ({response}) => {
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
      hero={<Hero title="Dahlia Shows" image="/purple-flowers.jpg" />}
      isCommercePage={false}
    >
      <NewSeo page={pages.shows} />
      <Bumper text="Show dates, locations and info will be updated as they are announced by their respective clubs." />
      <ShowList />
    </Layout>
  );
};

export default Shows;
