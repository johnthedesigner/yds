import {Link} from '@shopify/hydrogen/client';
import _ from 'lodash';
import moment from 'moment';

import Layout from '../components/Layout.server';
import Hero from '../components/Hero.server';
import Bumper from '../components/Bumper.server';
import {
  CompactText,
  CompactTextWrapper,
} from '../components/CompactText.server';
import bizmembers from '../bizmembers';

const BusinessMembers = ({response}) => {
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

  const sortedBizMembers = _.orderBy(bizmembers, 'business name');

  const memberBlockStyles = {
    marginBottom: '1rem',
  };

  const memberDetailsStyles = {
    margin: '0.5rem',
    fontSize: '1.25rem',
  };

  const Location = (props) => {
    if (props.city && props.state) {
      return (
        <p style={memberDetailsStyles}>
          {props.city}, {props.state}
        </p>
      );
    } else if (!props.city && props.state) {
      return <p style={memberDetailsStyles}>{props.state}</p>;
    } else {
      return null;
    }
  };

  const MemberSince = (props) => {
    let membershipDate = moment(props.date);
    if (props.date) {
      return (
        <p style={memberDetailsStyles}>
          Member since {membershipDate.format('MMMM YYYY')}
        </p>
      );
    } else {
      return null;
    }
  };

  const WebsiteLink = (props) => {
    if (props.link) {
      return (
        <span>
          <Link to={props.link} target="_blank">
            <img src="/website.svg" />
          </Link>
        </span>
      );
    } else {
      return null;
    }
  };

  const FacebookLink = (props) => {
    if (props.link) {
      return (
        <span>
          <Link to={props.link} target="_blank">
            <img src="/fb.svg" />
          </Link>
        </span>
      );
    } else {
      return null;
    }
  };

  const InstagramLink = (props) => {
    if (props.handle) {
      return (
        <span>
          <Link to={`http://instagram.com/${props.handle}`} target="_blank">
            <img src="/ig.svg" />
          </Link>
        </span>
      );
    } else {
      return null;
    }
  };

  return (
    <Layout
      hero={<Hero title="Member Businesses" image="/garden.jpg" />}
      isCommercePage={false}
    >
      <CompactTextWrapper>
        {_.map(sortedBizMembers, (member, index) => {
          return (
            <CompactText key={index}>
              <div
                style={{
                  textAlign: 'center',
                  marginBottom: '2rem',
                }}
              >
                <h3 style={{margin: '0.5rem 0'}}>{member['business name']}</h3>
                <Location city={member.city} state={member.state} />
                <MemberSince date={member['member since']} />
                <p style={memberDetailsStyles}>
                  <WebsiteLink link={member['business url']} />
                  <FacebookLink link={member['facebook url']} />
                  <InstagramLink handle={member['ig handle']} />
                </p>
              </div>
            </CompactText>
          );
        })}
        <Bumper
          text="Reach out to inquire about opportunities to get involved"
          buttonUrl="/contact"
          buttonLabel="Get in Touch"
        />
      </CompactTextWrapper>
    </Layout>
  );
};

export default BusinessMembers;
