import { useState } from "react";
import _ from "lodash";
import moment from "moment";

import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Bumper from "../components/Bumper";
import NewSeo from "../components/NewSeo";
import pages from "../utils/pages.json";
import { events, eventTypes } from "../utils/eventsList";

const Meetings = () => {
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [showMeetings, setShowMeetings] = useState(true);
  const [showWorkdays, setShowWorkdays] = useState(true);

  const colors = {
    blue: "#506F98",
    red: "#C65A60",
  };

  const formatDate = (date) => {
    return moment(date).format("dddd, MMM D, YYYY");
  };

  const Date = (props) => {
    if (props.startDate && props.endDate) {
      return (
        <span>
          {formatDate(props.startDate)} – {formatDate(props.endDate)}
        </span>
      );
    } else if (props.startDate) {
      return <span>{formatDate(props.startDate)}</span>;
    } else {
      return null;
    }
  };

  const Event = (props) => {
    const [showMore, setShowMore] = useState(false);

    let eventLabelStyles = {
      background: props.label === eventTypes.meeting ? colors.blue : colors.red,
      display: "inline-block",
      padding: ".5rem",
      fontSize: ".75rem",
      lineHeight: 1,
      height: "1.5rem",
      borderRadius: ".25rem",
      marginRight: "auto",
      marginBottom: 0,
      color: "white",
    };
    let showMoreButtonStyles = {
      fontFamily: "'Newsreader', serif",
      textDecoration: "underline",
      cursor: "pointer",
      display: "inline",
      background: "none",
      border: "none",
      color: "#C65A60",
      textAlign: "left",
      marginRight: "auto",
      padding: 0,
    };

    return (
      <div className="event">
        <h4 className="event__label" style={eventLabelStyles}>
          {props.label}
        </h4>
        <h3 className="event__date" style={{ fontSize: "2rem" }}>
          <Date startDate={props.date} endDate={props.dateEnd} /> | {props.time}
        </h3>
        <h4 className="event__name">{props.name}</h4>
        <div
          className="show-more__content"
          style={{ display: showMore ? "block" : "none" }}>
          {_.map(props.showMore, (item, index) => {
            return (
              <div key={index}>
                <h4
                  style={{
                    fontSize: ".75rem",
                    fontWeight: "bold",
                    margin: "1.5rem 0 0",
                  }}>
                  {item.name}
                </h4>
                <item.content />
              </div>
            );
          })}
        </div>
        <button
          className="show-more__button"
          style={{
            ...showMoreButtonStyles,
            display: props.showMore ? "inline" : "none",
          }}
          onClick={() => setShowMore(!showMore)}>
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>
    );
  };

  let eventTypeButtonStyles = {
    fontFamily: "'Newsreader', serif",
    textTransform: "uppercase",
    display: "inline-block",
    padding: ".5rem",
    fontSize: ".75rem",
    lineHeight: 1,
    height: "1.5rem",
    border: "none",
    borderRadius: ".25rem",
    marginRight: "auto",
    color: "white",
    cursor: "pointer",
  };

  const displayedEvents = () => {
    let eventsToDisplay = [];

    if (showPastEvents) {
      eventsToDisplay = [...events];
    } else {
      _.map(events, (event) => {
        if (moment().isBefore(moment(event.date).add(1, "days"))) {
          eventsToDisplay.push(event);
        }
      });
    }

    return eventsToDisplay;
  };

  let buttonStyles = (type) => {
    let defaultStyles = {
      border: "none",
      background: "none",
      fontFamily: "inherit",
      fontSize: "inherit",
    };
    if (
      (showPastEvents && type === "all") ||
      (!showPastEvents && type === "upcoming")
    ) {
      return {
        ...defaultStyles,
        color: "#3d4549",
      };
    } else {
      return {
        ...defaultStyles,
        color: "#BBB",
        cursor: "pointer",
      };
    }
  };

  return (
    <Layout
      hero={
        <Hero title="Meetings & Events" image="/colorful-arrangement.jpg" />
      }
      isCommercePage={false}>
      <NewSeo page={pages.meetings} />
      <Bumper text="Club meetings will typically be held on the 1st Sunday of the month.  During the dahlia blooming season we will hold a few extra events." />
      <div
        style={{
          width: "60rem",
          maxWidth: "90%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "row",
        }}>
        <p
          style={{
            flex: 1,
          }}>
          Event Type:{" "}
          <button
            style={{
              ...eventTypeButtonStyles,
              background: showMeetings ? colors.blue : "gray",
            }}
            onClick={() => setShowMeetings(!showMeetings)}>
            Meetings
          </button>{" "}
          |{" "}
          <button
            style={{
              ...eventTypeButtonStyles,
              background: showWorkdays ? colors.red : "gray",
            }}
            onClick={() => setShowWorkdays(!showWorkdays)}>
            Workdays
          </button>
        </p>
        <p
          style={{
            flex: 1,
            textAlign: "right",
          }}>
          Event Date:{" "}
          <button
            style={buttonStyles("upcoming")}
            onClick={() => setShowPastEvents(false)}>
            Upcoming Events
          </button>{" "}
          |{" "}
          <button
            style={buttonStyles("all")}
            onClick={() => setShowPastEvents(true)}>
            All Events
          </button>
        </p>
      </div>
      {_.map(displayedEvents(), (event, index) => {
        if (
          (event.label === eventTypes.meeting && showMeetings) ||
          (event.label === eventTypes.workday && showWorkdays)
        ) {
          return (
            <Event
              {...event}
              key={event.date + index}
              date={moment(event.date).format("dddd, MMMM D, YYYY")}
            />
          );
        } else {
          return null;
        }
      })}
      <Bumper
        text="Become a member to attend meetings & events and much more!"
        buttonUrl="/membership"
        buttonLabel="Learn About Memberships"
      />
    </Layout>
  );
};

export default Meetings;
