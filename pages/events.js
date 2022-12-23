import _ from "lodash";
import ReactMarkdown from "react-markdown";
import { useSession } from "next-auth/react";

import Layout from "../components/Layout";
import Hero from "../components/Hero";
import NewSeo from "../components/NewSeo";
import pages from "../utils/pages.json";
import { getCollection } from "../utils/strapi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

const Events = ({ events }) => {
  const { status } = useSession();
  const [filteredEvents, setFilteredEvents] = useState({});
  const [includeInPerson, setIncludeInPerson] = useState(true);
  const [includeGardenTour, setIncludeGardenTour] = useState(true);
  const [includeMeeting, setIncludeMeeting] = useState(true);
  const [includeWorkDay, setIncludeWorkDay] = useState(true);
  const [includeZoomMeeting, setIncludeZoomMeeting] = useState(true);

  // Build an index of events grouped by four-digit year and two-digit month
  const groupByDate = (events) => {
    const groupedEvents = {};
    let groupedByYear = _.groupBy(events, (event) => {
      return DateTime.fromISO(event.attributes.date).toFormat("yyyy");
    });
    // Go through each year and group events within them by month
    _.each(groupedByYear, (yearGroup) => {
      // Get the year for building our index
      let firstEventOfYear = yearGroup[0];
      let year = DateTime.fromISO(firstEventOfYear.attributes.date).toFormat(
        "yyyy"
      );
      // Add year to index
      groupedEvents[year] = {};

      // Group the year's events by month
      let groupedByMonth = _.groupBy(yearGroup, (event) => {
        return DateTime.fromISO(event.attributes.date).toFormat("MM");
      });

      // Loop through months within a single year and assign to index
      _.each(groupedByMonth, (monthGroup) => {
        // Get the month for building our index
        let firstEventOfMonth = monthGroup[0];
        let month = DateTime.fromISO(
          firstEventOfMonth.attributes.date
        ).toFormat("MM");

        // Assign month groups to index under corresponding year
        groupedEvents[year][month] = monthGroup;
      });
    });
    return groupedEvents;
  };

  const monthStrings = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
  };

  useEffect(() => {
    let filteredEvents = _.filter(events, (event) => {
      if (includeInPerson && event.attributes.inPerson) {
        return true;
      } else if (includeMeeting && event.attributes.meeting) {
        return true;
      } else if (includeGardenTour && event.attributes.gardenTour) {
        return true;
      } else if (includeWorkDay && event.attributes.workDay) return false;
      else if (includeZoomMeeting && event.attributes.zoomMeeting) {
        return true;
      } else {
        return false;
      }
    });
    let orderedEvents = _.orderBy(
      filteredEvents,
      (event) => {
        return event.attributes.date;
      },
      "desc"
    );
    setFilteredEvents(groupByDate(orderedEvents));
  }, [
    events,
    includeGardenTour,
    includeInPerson,
    includeMeeting,
    includeWorkDay,
    includeZoomMeeting,
  ]);

  const formatTime = (time) => {
    let splitTime = time.split(":");
    let hours = (0 - splitTime[0]) * -1; // Coerce into a number
    hours = ((hours + 11) % 12) + 1; // Convert to 12-hour time
    let minutes = splitTime[1];
    let suffix = splitTime[0] > 11 ? "pm" : "am";
    let formattedTime = `${hours}:${minutes} ${suffix}`;
    return formattedTime;
  };

  const Event = ({ event }) => {
    const [expandDetails, setExpandDetails] = useState(false);

    return (
      <div className="event">
        <p className="event__date">
          {DateTime.fromISO(event.attributes.date).toFormat("EEEE, DD")}
          {event.attributes.startTime && (
            <>
              {" "}
              | {formatTime(event.attributes.startTime)}
              {event.attributes.endTime && (
                <> – {formatTime(event.attributes.endTime)}</>
              )}
            </>
          )}
        </p>
        <h3 className="event__name">{event.attributes.name}</h3>
        <p className="event__location">
          <em className="event__details-label">Location:</em>{" "}
          {event.attributes.zoomMeeting
            ? "Virtual"
            : event.attributes.locationName}
        </p>
        <div className="event__meta">
          {event.attributes.inPerson === true && (
            <span className="event__tag event__tag--in-person">In Person</span>
          )}
          {event.attributes.meeting === true && (
            <span className="event__tag event__tag--meeting">Club Meeting</span>
          )}
          {event.attributes.gardenTour === true && (
            <span className="event__tag event__tag--garden-tour">
              Garden Tour
            </span>
          )}
          {event.attributes.workDay === true && (
            <span className="event__tag event__tag--work-day">Work Day</span>
          )}
          {event.attributes.zoomMeeting === true && (
            <span className="event__tag event__tag--zoom">Zoom Meeting</span>
          )}
        </div>
        <div className="event__details">
          <button
            className="event__show-hide"
            onClick={() => setExpandDetails(!expandDetails)}>
            {expandDetails ? "Hide Details" : "Show Details"}
          </button>
          {expandDetails && (
            <>
              {event.attributes.locationAddress && (
                <p className="event__location-link">
                  <em className="event__location-link-label">Event Address:</em>{" "}
                  <Link
                    href={`https://www.google.com/maps/place/${encodeURIComponent(
                      event.attributes.locationAddress
                    )}`}>
                    <a target="_blank" title="Meeting Zoom link">
                      {event.attributes.locationAddress}
                    </a>
                  </Link>
                </p>
              )}
            </>
          )}
          {expandDetails && (
            <>
              {event.attributes.zoomLink && (
                <p className="event__zoom-link">
                  <em className="event__zoom-link-label">Zoom Link:</em>{" "}
                  {status === "authenticated" ? (
                    <Link href={event.attributes.zoomLink}>
                      <a target="_blank" title="Meeting Zoom link">
                        {event.attributes.zoomLink}
                      </a>
                    </Link>
                  ) : (
                    <em>Log in with a member account for Zoom Link</em>
                  )}
                </p>
              )}
              {event.attributes.rsvpLink && (
                <p className="event__rsvp-link">
                  <em className="event__rsvp-link-label">
                    RSVP for this event:
                  </em>{" "}
                  {status === "authenticated" ? (
                    <Link href={event.attributes.rsvpLink}>
                      <a target="_blank" title="Meeting RSVP link">
                        {event.attributes.rsvpLink}
                      </a>
                    </Link>
                  ) : (
                    <em>Log in with a member account for RSVP Link</em>
                  )}
                </p>
              )}
              <div className="event__details-body">
                <ReactMarkdown>{event.attributes.details}</ReactMarkdown>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <Layout
      hero={
        <Hero title="Meetings & Events" image="/colorful-arrangement.jpg" />
      }
      isCommercePage={false}>
      <NewSeo page={pages.meetings} />
      <div className="events-list__filter-row">
        <span className="events-list__filter-label">Included Events:</span>
        <button
          className={`events-list__filter-button events-list__filter-button--in-person ${
            !includeInPerson ? "events-list__filter-button--disabled" : ""
          }`}
          onClick={() => setIncludeInPerson(!includeInPerson)}>
          {includeInPerson === true ? "✓" : "✗"} In Person
        </button>
        <button
          className={`events-list__filter-button events-list__filter-button--meeting ${
            !includeMeeting ? "events-list__filter-button--disabled" : ""
          }`}
          onClick={() => setIncludeMeeting(!includeMeeting)}>
          {includeMeeting === true ? "✓" : "✗"} Club Meeting
        </button>
        <button
          className={`events-list__filter-button events-list__filter-button--garden-tour ${
            !includeGardenTour ? "events-list__filter-button--disabled" : ""
          }`}
          onClick={() => setIncludeGardenTour(!includeGardenTour)}>
          {includeGardenTour === true ? "✓" : "✗"} Garden Tour
        </button>
        <button
          className={`events-list__filter-button events-list__filter-button--work-day ${
            !includeWorkDay ? "events-list__filter-button--disabled" : ""
          }`}
          onClick={() => setIncludeWorkDay(!includeWorkDay)}>
          {includeWorkDay === true ? "✓" : "✗"} Work Day
        </button>
        <button
          className={`events-list__filter-button events-list__filter-button--zoom ${
            !includeZoomMeeting ? "events-list__filter-button--disabled" : ""
          }`}
          onClick={() => setIncludeZoomMeeting(!includeZoomMeeting)}>
          {includeZoomMeeting === true ? "✓" : "✗"} Zoom Meeting
        </button>
      </div>
      <div className="events-list">
        {_.map(_.sortBy(_.keys(filteredEvents)), (year) => {
          return (
            <div className="events-list__year" key={year}>
              <div className="events-list__year-marker">{year}&nbsp;/</div>
              <div className="events-list__year-group">
                {_.map(_.sortBy(_.keys(filteredEvents[year])), (month) => {
                  return (
                    <div
                      className="events-list__month"
                      key={`${year}-${month}`}>
                      <div className="events-list__month-marker">
                        {monthStrings[month]}
                      </div>
                      <div className="events-list__month-group">
                        {_.map(filteredEvents[year][month], (event) => {
                          return <Event event={event} key={event.id} />;
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

// Fetch shows for server side rendering
export const getServerSideProps = async (ctx) => {
  let events = await getCollection("events");
  return { props: { events } };
};

export default Events;
