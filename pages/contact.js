import { useState } from "react";

import Layout from "../components/Layout";
import Hero from "../components/Hero";
import { CompactText, CompactTextWrapper } from "../components/CompactText";
import NewSeo from "../components/NewSeo";
import pages from "../utils/pages.json";
import Link from "next/link";
import Image from "next/image";

const Contact = () => {
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otherTopic, setOtherTopic] = useState("");

  const isOther = () => {
    return topic === "other";
  };

  const OtherFormField = () => {
    if (isOther()) {
      return (
        <TextInput
          label="If other, what subject?"
          name="entry.389562223"
          required={true}
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
              <Image src="/ig.svg" alt="Instagram Icon" />
            </a>
          </Link>
          <Link href="http://facebook.com/yankeedahliasociety">
            <a
              className="footer__social-icon"
              title="Yankee Dahlia Society on Facebook"
              target="_blank">
              <Image src="/fb.svg" alt="Instagram Icon" />
            </a>
          </Link>
        </CompactText>
        <CompactText>
          <h3>Contact Us</h3>
          <form action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSeHRwqdeRYp6EOO4SEQpKQTHIYFwxb81mQi6HkLtPTp5RTUBw/formResponse">
            <TextInput
              label="Email Address"
              name="entry.1132014782"
              key="entry.1132014782"
              required={true}
              onChange={(e) => {
                setEmail(e.target.value);
                e.preventDefault();
              }}
              value={email}
            />
            <TextInput
              label="Phone Number"
              name="entry.537002206"
              key="entry.537002206"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
            <TextInput
              label="Your Name"
              name="entry.605890569"
              key="entry.605890569"
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
                name="entry.1748743079"
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
              <textarea required name="entry.84551917" />
            </fieldset>
            <button className="button" type="submit">
              Submit
            </button>
          </form>
          <p>
            <em className="required-footnote">* Required field</em>
          </p>
        </CompactText>
      </CompactTextWrapper>
    </Layout>
  );
};

export default Contact;
