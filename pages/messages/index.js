import _ from "lodash";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import TimeAgo from "javascript-time-ago";

import Layout from "../../components/Layout";
import NewSeo from "../../components/NewSeo";
import pages from "../../utils/pages.json";
import { getMessages } from "../../utils/strapi";
import Link from "next/link";
import { useRouter } from "next/router";

const Messages = ({ messages }) => {
  const { data: session, status } = useSession();
  const [order, setOrder] = useState("desc");
  const [sortedMessages, setSortedMessages] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);

  const router = useRouter();

  // Sort messages for the table
  const handleReSort = () => {
    let flatMessages = _.map(messages, (message) => {
      return { ...message.attributes, id: message.id };
    });
    setSortedMessages(_.orderBy(flatMessages, "createdAt", order));
  };
  useEffect(() => {
    handleReSort();
  }, [order]);

  // Create time formatter (English).
  const timeAgo = new TimeAgo("en-US");

  const clickRow = (id) => {
    router.push(`messages/${id}`);
  };

  const MessageCell = ({ children, id }) => {
    const cellStyles = {
      background: id === hoveredRow ? "#EEE" : "white",
    };

    return (
      <div
        className="message-table__cell"
        style={cellStyles}
        onClick={() => {
          clickRow(id);
        }}
        onMouseEnter={() => {
          setHoveredRow(id);
        }}
        onMouseLeave={() => {
          setHoveredRow(null);
        }}>
        {children}
      </div>
    );
  };

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
        <div className="message-header">
          <h1>Messages</h1>
          <select
            className="message-header__sort-select"
            onChange={(e) => setOrder(e.target.value)}
            value={order}>
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
        <div className="message-table">
          <div className="message-table__header-cell">Sender</div>
          <div className="message-table__header-cell">Message</div>
          <div className="message-table__header-cell"></div>
          {_.map(sortedMessages, (message) => {
            let {
              id,
              emailAddress,
              name,
              topic,
              topicOther,
              phoneNumber,
              messageText,
              createdAt,
            } = message;

            let timeAgoLabel = timeAgo.format(Date.parse(createdAt));

            return (
              <React.Fragment key={id}>
                <MessageCell id={id}>
                  <b>{name}</b>{" "}
                  <em style={{ color: "#999" }}>({emailAddress})</em>
                </MessageCell>
                <MessageCell id={id}>
                  <b>{messageText}</b>
                </MessageCell>
                <MessageCell id={id}>
                  <b>{timeAgoLabel}</b>
                </MessageCell>
              </React.Fragment>
            );
          })}
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
  let { query } = ctx;

  let page = query.page ? query.page : 1;
  let pagesize = query.pagesize ? query.pagesize : 50;
  let order = query.order ? query.order : "DESC";
  let sort = query.sort ? query.sort : "timestamp";

  let messages = await getMessages(page, pagesize);

  return {
    props: { messages },
  };
};

export default Messages;
