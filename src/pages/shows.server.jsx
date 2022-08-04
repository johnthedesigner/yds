import {fetchSync, CacheLong, useQuery} from '@shopify/hydrogen';
import {Suspense} from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import _ from 'lodash';
import contentful from 'contentful';

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

  const [events, setEvents] = useState(null);

  const {VITE_CONTENT_SPACE_ID, VITE_CONTENT_TOKEN, VITE_CONTENT_ENTRY_ID} =
    process.env;

  const client = contentful.createClient({
    space: VITE_CONTENT_SPACE_ID,
    accessToken: VITE_CONTENT_TOKEN,
  });

  // useEffect(() => {
  console.log('prepare to fetch events');
  const {data} = useQuery('getEvents', async () => {
    // const response = await fetch(
    //   `https://cdn.contentful.com/spaces/${VITE_CONTENT_SPACE_ID}/environments/master/entries/${VITE_CONTENT_ENTRY_ID}?access_token=${VITE_CONTENT_TOKEN}`,
    //   {
    //     headers: {
    //       accept: 'application/json',
    //     },
    //   },
    // );
    // return await response.json();
    client.getEntries().then(function (entries) {
      // log the title for all the entries that have it
      entries.items.forEach(function (entry) {
        if (entry.fields.name) {
          console.log(entry.fields.name);
        }
      });
    });
  });
  console.log(data);
  // setEvents(data);
  // }, []);

  // console.log(events);

  return (
    <Layout
      hero={<Hero title="Dahlia Shows" image="/purple-flowers.jpg" />}
      isCommercePage={false}
    >
      {_.map(events, (event) => {
        return <p>{event.name}</p>;
      })}
      <NewSeo page={pages.shows} />
      <Bumper text="Show dates, locations and info will be updated as they are announced by their respective clubs." />
      <Suspense>
        <ShowList />
      </Suspense>
    </Layout>
  );
};

export default Shows;
