import moment from "moment";
import _ from "lodash";
import Link from "next/link";

const HomeEventBlock = ({ events }) => {
  const upcomingEvents = _.filter(events, (event) => {
    return moment().isBefore(moment(event.attributes.date).add(1, "days"));
  });

  if (upcomingEvents[0]) {
    return (
      <>
        <h3>
          Save the Date:{" "}
          {moment(upcomingEvents[0].attributes.date).format(
            "dddd, MMMM D, YYYY"
          )}
        </h3>
        <p>{upcomingEvents[0].attributes.name}</p>
        <p>Be sure to mark your calendar to join us for our next meeting.</p>
        <Link href="/meetings">
          <a className="button" title="Yankee Dahlia Society Meeting Calendar">
            Meeting Calendar
          </a>
        </Link>
      </>
    );
  } else {
    return null;
  }
};

export default HomeEventBlock;
