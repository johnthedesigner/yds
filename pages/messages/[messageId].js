import _ from "lodash";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import TimeAgo from "javascript-time-ago";

import Layout from "../../components/Layout";
import NewSeo from "../../components/NewSeo";
import pages from "../../utils/pages.json";
// import { getMessage, spamMessage, addressMessage } from "../../utils/strapi";
import { getMessage } from "../../utils/strapi";
import Link from "next/link";

const Message = ({ message }) => {
  const { data: session, status } = useSession();

  const [addressed, setAddressed] = useState(false);
  const [spam, setSpam] = useState(false);

  const handleAddressed = async (id, status) => {
    // let messageStatus = await addressMessage(id, !addressed);
    // setAddressed = messageStatus;
  };

  const handleSpam = async (id, status) => {
    // let messageStatus = await spamMessage(id, !spam);
    // let setSpam = messageStatus;
  };

  console.log(message);

  // Create time formatter (English).
  const timeAgo = new TimeAgo("en-US");
  let timeAgoLabel = timeAgo.format(Date.parse(message.attributes.createdAt));

  if (session && session.role != "admin") {
    return (
      <Layout>
        <NewSeo page={pages.messages} />
        <h1>Messages</h1>
        <h3>This page requires adminstrator access</h3>
      </Layout>
    );
  } else if (session && session.role === "admin") {
    return (
      <Layout>
        <NewSeo page={pages.messages} />
        <div className="message-detail">
          <div className="message-detail__info">
            <Link href="/messages">
              <a>Back to Messages</a>
            </Link>
            <p className="message-detail__info-label">Sender:</p>
            <p className="message-detail__info-value">
              {message.attributes.name}
            </p>
            <p className="message-detail__info-label">Topic:</p>
            <p className="message-detail__info-value">
              {message.attributes.topic}
            </p>
            {message.attributes.topic === "other" && (
              <>
                <p className="message-detail__info-label">Other Topicf:</p>
                <p className="message-detail__info-value">
                  {message.attributes.otherTopic}
                </p>
              </>
            )}
            <p className="message-detail__info-label">Email Address:</p>
            <p className="message-detail__info-value">
              {message.attributes.emailAddress}
            </p>
            <p className="message-detail__info-label">Phone Number:</p>
            <p className="message-detail__info-value">
              {message.attributes.phoneNumber}
            </p>
          </div>
          <div className="message-detail__body">
            <div>
              <button
                className="message-detail__action-button"
                style={{
                  background: addressed ? "green" : "white",
                  color: addressed ? "white" : "initial",
                }}
                onClick={handleAddressed}>
                {addressed ? "✓ Message Addressed" : "Mark as Addressed"}
              </button>
              <button
                className="message-detail__action-button"
                style={{
                  background: spam ? "red" : "white",
                  color: spam ? "white" : "initial",
                }}
                onClick={handleSpam}>
                {spam ? "✕ Marked as Spam" : "Mark as Spam"}
              </button>
            </div>
            <div>
              <p className="message-detail__info-label">Sent:</p>
              <p className="message-detail__info-value">{timeAgoLabel}</p>
            </div>
            <div>
              <p className="message-detail__info-label">Message:</p>
              <p>{message.attributes.messageText}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <NewSeo page={pages.messages} />
        <h1>Messages</h1>
        <h3>Loading</h3>
      </Layout>
    );
  }
};

// Fetch products for server side rendering
export const getServerSideProps = async (ctx) => {
  console.log(ctx);
  let message = await getMessage(ctx.params.messageId);

  return {
    props: { message },
  };
};

export default Message;
