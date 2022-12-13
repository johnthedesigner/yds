import { useState } from "react";

import Layout from "../components/Layout";
import Hero from "../components/Hero";
import { CompactText, CompactTextWrapper } from "../components/CompactText";
import NewSeo from "../components/NewSeo";
import pages from "../utils/pages.json";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

const Contact = () => {
  const [name, setName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [topic, setTopic] = useState("");
  const [topicOther, setTopicOther] = useState("");
  const [messageText, setMessageText] = useState("");
  const [succesFlag, setSuccessFlag] = useState(false);

  const isOther = () => {
    return topic === "other";
  };

  const OtherFormField = () => {
    if (isOther()) {
      return (
        <TextInput
          label="If other, what subject?"
          name="topicOther"
          required={true}
          onChange={(e) => setTopicOther(e.target.value)}
        />
      );
    } else {
      return null;
    }
  };

  const RequiredMark = () => {
    return <b className="required-mark">*</b>;
  };

  const TextInput = (props) => {
    let MaybeRequiredMark = (props) => {
      if (props.required) {
        return <RequiredMark />;
      } else {
        return null;
      }
    };

    return (
      <fieldset>
        <label>
          {props.label}
          <MaybeRequiredMark required="props.required" />
        </label>
        <input
          type="text"
          name={props.name}
          required={props.required}
          onChange={props.onChange}
          value={props.value}
        />
      </fieldset>
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let formFields = {
      topic,
      topicOther,
      name,
      emailAddress,
      phoneNumber,
      messageText,
    };

    axios
      .post("/api/post-message", formFields)
      .then((response) => {
        // Reset email triggered
        // res.status(200).json({ response });
        console.log("RESPONSE", response.data);

        // Unset all contact fields
        setName("");
        setEmailAddress("");
        setPhoneNumber("");
        setTopic("");
        setTopicOther("");
        setMessageText("");

        // Show Success Message
        setSuccessFlag(true);
        setTimeout(() => {
          setSuccessFlag(false);
        }, 2000);
      })
      .catch((error) => {
        // res.status(200).json({ error });
        console.log("ERROR", error);
      });
    return false;
  };

  return (
    <Layout
      hero={<Hero title="Contact Us" image="/macro-dahlia.jpg" />}
      isCommercePage={false}>
      <NewSeo page={pages.contact} />
      <CompactTextWrapper>
        <CompactText>
          <h3>Have questions, ideas or would like to get involved?</h3>
          <p>
            Are you new to growing dahlias and have some questions? The best way
            to learn is by becoming a member.
          </p>
          <p>
            It takes a village to run a club and if you have a little time
            please reach out to us because we would greatly appreciate any time
            you have to support the club.
          </p>
          <Link href="http://instagram.com/yankeedahliasociety">
            <a
              className="footer__social-icon"
              title="Yankee Dahlia Society on Instagram"
              target="_blank">
              <Image
                src="/ig.svg"
                alt="Instagram Icon"
                width="24"
                height="24"
              />
            </a>
          </Link>
          <Link href="http://facebook.com/yankeedahliasociety">
            <a
              className="footer__social-icon"
              title="Yankee Dahlia Society on Facebook"
              target="_blank">
              <Image
                src="/fb.svg"
                alt="Instagram Icon"
                width="24"
                height="24"
              />
            </a>
          </Link>
        </CompactText>
        <CompactText>
          <h3>Contact Us</h3>
          <form onSubmit={handleFormSubmit}>
            <TextInput
              label="Email Address"
              name="emailAddress"
              key="emailAddress"
              required={true}
              onChange={(e) => {
                setEmailAddress(e.target.value);
              }}
              value={emailAddress}
            />
            <TextInput
              label="Phone Number"
              name="phoneNumber"
              key="phoneNumber"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            />
            <TextInput
              label="Your Name"
              name="name"
              key="name"
              required={true}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <fieldset>
              <label>
                What are you contacting us about?
                <RequiredMark />
              </label>
              <select
                onChange={(e) => setTopic(e.target.value)}
                value={topic}
                name="topic"
                required={true}>
                <option value="">Select an option</option>
                <option value="Membership Question">Membership Question</option>
                <option value="Growing Partnership">Growing Partnership</option>
                <option value="Getting Involved">Getting Involved</option>
                <option value="Dahlia Questions">Dahlia Questions</option>
                <option value="Try Out a Meeting">Try Out a Meeting</option>
                <option value="Tuber Sale">Tuber Sale</option>
                <option value="Club Idea/Feedback">Club Idea/Feedback</option>
                <option value="other">Other</option>
              </select>
            </fieldset>
            <OtherFormField />
            <fieldset>
              <label>
                Your message
                <RequiredMark />
              </label>
              <textarea
                required
                name="messageText"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
            </fieldset>
            <button className="button" type="submit">
              Submit
            </button>
          </form>
          <div
            style={{
              background: "green",
              padding: "1rem",
              display: succesFlag ? "block" : "none",
            }}>
            Sucessfully submitted contact form
          </div>
          <p>
            <em className="required-footnote">* Required field</em>
          </p>
        </CompactText>
      </CompactTextWrapper>
    </Layout>
  );
};

export default Contact;
