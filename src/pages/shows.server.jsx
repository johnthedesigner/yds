import {useQuery} from '@shopify/hydrogen';
import _ from 'lodash';
import moment from 'moment';

import Layout from '../components/Layout.server';
import Hero from '../components/Hero.server';
import NewSeo from '../components/NewSeo.client';
import pages from '../pages.json';
import Bumper from '../components/Bumper.server';
import {getCollection} from '../strapi';

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

  // Get data from strapi
  const {data} = useQuery('getShows', () => {
    return getCollection('shows');
  });

  // Sort chronologically by start date
  const shows = _.orderBy(data, (show) => {
    return show.attributes.startDate;
  });

  const formatDate = (date) => {
    return moment(date).format('dddd, MMMM D, YYYY');
  };

  const Date = ({startDate, endDate}) => {
    if (startDate && endDate) {
      return (
        <h4 className="event__date">
          {formatDate(startDate)} – {formatDate(endDate)}
        </h4>
      );
    } else if (startDate) {
      return <h4 className="event__date">{formatDate(startDate)}</h4>;
    } else {
      return null;
    }
  };

  const File = ({file}) => {
    console.log(file);
    if (file) {
      return (
        <div className="event__link">
          <a href={file} target="_blank" rel="noreferrer">
            Download PDF Brochure
          </a>
        </div>
      );
    } else {
      return null;
    }
  };

  const Show = ({show}) => {
    let {
      name,
      startDate,
      endDate,
      organization,
      location,
      linkUrl,
      linkText,
      file,
    } = show.attributes;

    return (
      <div className="event">
        <Date startDate={startDate} endDate={endDate} />
        <h3 className="event__name">{name}</h3>
        {organization && (
          <div className="event__location">Organization: {organization}</div>
        )}
        {location && (
          <div className="event__location">Location: {location}</div>
        )}
        {linkUrl && (
          <div className="event__link">
            <a href={linkUrl} target="_blank" rel="noreferrer">
              {linkText ? linkText : linkUrl}
            </a>
          </div>
        )}
        {file && <File file={file.fields.file.url} />}
      </div>
    );
  };

  return (
    <Layout
      hero={<Hero title="Dahlia Shows" image="/purple-flowers.jpg" />}
      isCommercePage={false}
    >
      <NewSeo page={pages.shows} />
      <Bumper text="Show dates, locations and info will be updated as they are announced by their respective clubs." />
      {_.map(shows, (show) => {
        return <Show key={show.id} show={show} />;
      })}
    </Layout>
  );
};

export default Shows;
