import Layout from '../components/Layout.server';
import Hero from '../components/Hero.server';
import ShowList from '../components/ShowList.client';

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
      hero={
        <Hero title="About Yankee Dahlia Society" image="/purple-flowers.jpg" />
      }
      isCommercePage={false}
    >
      <ShowList />
    </Layout>
  );
};

export default Shows;
