import Layout from '../components/Layout.server';
import Hero from '../components/Hero.server';
import Bumper from '../components/Bumper.server';
import EventList from '../components/EventList.client';

const Meetings = () => {
  return (
    <Layout
      hero={
        <Hero title="Meetings & Events" image="/colorful-arrangement.jpg" />
      }
      isCommercePage={false}
    >
      <Bumper text="Club meetings will typically be held on the 1st Sunday of the month.  During the dahlia blooming season we will hold a few extra events." />
      <EventList />
      <Bumper
        text="Become a member to attend meetings & events and much more!"
        buttonUrl="/membership"
        buttonLabel="Learn About Memberships"
      />
    </Layout>
  );
};

export default Meetings;
