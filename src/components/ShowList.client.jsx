import {useState} from 'react';
import moment from 'moment';
import _ from 'lodash';

import shows from '../showsList';

const formatDate = (date) => {
  return moment(date).format('dddd, MMMM D, YYYY');
};

const Date = (props) => {
  if (props.startDate && props.endDate) {
    return (
      <h4 className="event__date">
        {formatDate(props.startDate)} – {formatDate(props.endDate)}
      </h4>
    );
  } else if (props.startDate) {
    return <h4 className="event__date">{formatDate(props.startDate)}</h4>;
  } else {
    return null;
  }
};

const File = (props) => {
  if (props.file) {
    return (
      <div className="event__link">
        <a href={props.file} target="_blank" rel="noreferrer">
          Download PDF Brochure
        </a>
      </div>
    );
  } else {
    return null;
  }
};

const Show = (props) => {
  return (
    <div className="event">
      <Date startDate={props.startDate} endDate={props.endDate} />
      <h3 className="event__name">{props.name}</h3>
      <div className="event__location">Organization: {props.org}</div>
      <div className="event__location">Location: {props.location}</div>
      <div className="event__link">
        <a href={props.link} target="_blank" rel="noreferrer">
          {props.link}
        </a>
      </div>
      <br />
      <File file={props.file} />
    </div>
  );
};

const ShowList = (props) => {
  const [showsType, setShowsType] = useState('upcoming');

  const displayedShows = () => {
    let showsToDisplay = [];

    if (showsType == 'upcoming') {
      _.map(shows, (show) => {
        if (moment().isBefore(moment(show.date).add(1, 'days'))) {
          showsToDisplay.push(show);
        }
      });
    } else if (showsType == 'all') {
      showsToDisplay = [...shows];
    }

    return showsToDisplay;
  };

  let buttonStyles = (type) => {
    let defaultStyles = {
      border: 'none',
      background: 'none',
      fontFamily: 'inherit',
      fontSize: 'inherit',
    };
    if (type == showsType) {
      return {
        ...defaultStyles,
        color: '#3d4549',
      };
    } else {
      return {
        ...defaultStyles,
        color: '#BBB',
        cursor: 'pointer',
      };
    }
  };

  return (
    <>
      {_.map(displayedShows(), (show, index) => {
        return (
          <Show
            key={index}
            startDate={show.startDate}
            endDate={show.endDate}
            name={show.name}
            link={show.link}
            location={show.location}
            org={show.org}
            file={show.file}
          />
        );
      })}
    </>
  );
};

export default ShowList;
