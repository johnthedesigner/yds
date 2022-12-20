import _ from "lodash";
import moment from "moment";

import Layout from "../components/Layout";
import Hero from "../components/Hero";
import NewSeo from "../components/NewSeo";
import pages from "../utils/pages.json";
import Bumper from "../components/Bumper";
import { getCollection } from "../utils/strapi";

const Shows = ({ shows }) => {
  // Sort chronologically by start date
  shows = _.orderBy(shows, (show) => {
    return show.attributes.startDate;
  });

  const formatDate = (date) => {
    return moment(date).format("dddd, MMMM D, YYYY");
  };

  const Date = ({ startDate, endDate }) => {
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

  const File = ({ file }) => {
    if (file && file.data) {
      return (
        <div className="event__link">
          <a
            href={file.data[0].attributes.name}
            target="_blank"
            rel="noreferrer">
            Download PDF Brochure
          </a>
        </div>
      );
    } else {
      return null;
    }
  };

  const Show = ({ show }) => {
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
      <div className="show">
        <Date startDate={startDate} endDate={endDate} />
        <h3 className="show__name">{name}</h3>
        {organization && (
          <div className="show__location">Organization: {organization}</div>
        )}
        {location && <div className="show__location">Location: {location}</div>}
        {linkUrl && (
          <div className="show__link">
            <a href={linkUrl} target="_blank" rel="noreferrer">
              {linkText ? linkText : linkUrl}
            </a>
          </div>
        )}
        {file && <File file={file} />}
      </div>
    );
  };

  return (
    <Layout
      hero={<Hero title="Dahlia Shows" image="/purple-flowers.jpg" />}
      isCommercePage={false}>
      <NewSeo page={pages.shows} />
      <Bumper text="Show dates, locations and info will be updated as they are announced by their respective clubs." />
      {_.map(shows, (show) => {
        return <Show key={show.id} show={show} />;
      })}
    </Layout>
  );
};

// Fetch shows for server side rendering
export const getServerSideProps = async (ctx) => {
  let shows = await getCollection("shows");
  return { props: { shows } };
};

export default Shows;
