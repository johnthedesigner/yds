import moment from 'moment';
import _ from 'lodash';
import {Link} from '@shopify/hydrogen/client';

import {events, eventTypes} from '../eventsList';

const upcomingEvents = [];
_.map(events, (event) => {
  if (moment().isBefore(moment(event.date).add(1, 'days'))) {
    upcomingEvents.push(event);
  }
});

const HomeEventBlock = () => {
  if (upcomingEvents[0]) {
    return (
      <>
        <h3>
          Save the Date:{' '}
          {moment(upcomingEvents[0].date).format('dddd, MMMM D, YYYY')}
        </h3>
        <p>{upcomingEvents[0].name}</p>
        <p>Be sure to mark your calendar to join us for our next meeting.</p>
        <Link
          to="/meetings"
          className="button"
          title="Yankee Dahlia Society Meeting Calendar"
        >
          Meeting Calendar
        </Link>
      </>
    );
  } else {
    return null;
  }
};

export default HomeEventBlock;
