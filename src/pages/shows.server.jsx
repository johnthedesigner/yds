import Layout from '../components/Layout.server';
import Hero from '../components/Hero.server';
import ShowList from '../components/ShowList.client';

const Shows = () => {
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
