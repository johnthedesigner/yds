import _ from "lodash";
import moment from "moment";
import Image from "next/image";

import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Bumper from "../components/Bumper";
import { CompactText, CompactTextWrapper } from "../components/CompactText";
import NewSeo from "../components/NewSeo";
import pages from "../utils/pages.json";
import { getCollection } from "../utils/strapi";

const BusinessMembers = ({ businessMembers }) => {
  // Sort alphabetically by business name
  const sortedBizMembers = _.orderBy(businessMembers, (member) => {
    return member.attributes.name;
  });

  const memberDetailsStyles = {
    margin: "0.5rem",
    fontSize: "1.25rem",
  };

  const Location = ({ city, state }) => {
    if (city && state) {
      return (
        <p style={memberDetailsStyles}>
          {city}, {state}
        </p>
      );
    } else if (!city && state) {
      return <p style={memberDetailsStyles}>{state}</p>;
    } else {
      return null;
    }
  };

  const MemberSince = ({ date }) => {
    let membershipDate = moment(date);
    if (date) {
      return (
        <p style={memberDetailsStyles}>
          Member since {membershipDate.format("MMMM YYYY")}
        </p>
      );
    } else {
      return null;
    }
  };

  const WebsiteLink = ({ url }) => {
    if (url) {
      return (
        <span>
          <a href={url} target="_blank" rel="noreferrer">
            <Image
              src="/website.svg"
              width={24}
              height={24}
              alt="Website Icon"
            />
          </a>
        </span>
      );
    } else {
      return null;
    }
  };

  const FacebookLink = ({ url }) => {
    if (url) {
      return (
        <span>
          <a href={url} target="_blank" rel="noreferrer">
            <Image src="/fb.svg" width={24} height={24} alt="Facebook Icon" />
          </a>
        </span>
      );
    } else {
      return null;
    }
  };

  const InstagramLink = ({ url }) => {
    if (url) {
      return (
        <span>
          <a href={url} target="_blank" rel="noreferrer">
            <Image src="/ig.svg" width={24} height={24} alt="Instagram Icon" />
          </a>
        </span>
      );
    } else {
      return null;
    }
  };

  return (
    <Layout
      hero={<Hero title="Member Businesses" image="/garden.jpg" />}
      isCommercePage={false}>
      <NewSeo page={pages.businessMembers} />
      <CompactTextWrapper>
        {_.map(sortedBizMembers, (member) => {
          let {
            name,
            city,
            state,
            startDate,
            websiteUrl,
            facebookUrl,
            instagramUrl,
          } = member.attributes;
          let { id } = member;

          return (
            <CompactText key={id}>
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "2rem",
                }}>
                <h3 style={{ margin: "0.5rem 0" }}>{name}</h3>
                <Location city={city} state={state} />
                <MemberSince date={startDate} />
                <p style={memberDetailsStyles}>
                  <WebsiteLink url={websiteUrl} />
                  <FacebookLink url={facebookUrl} />
                  <InstagramLink url={instagramUrl} />
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

// Fetch business members for server side rendering
export const getServerSideProps = async (ctx) => {
  let businessMembers = await getCollection("business-members");
  return { props: { businessMembers } };
};

export default BusinessMembers;
