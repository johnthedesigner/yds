import {useState} from 'react';

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

const ContactForm = (props) => {
  const [topic, setTopic] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otherTopic, setOtherTopic] = useState('');

  const isOther = () => {
    return topic === 'other';
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

  return (
    <>
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
            required={true}
          >
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
    </>
  );
};

export default ContactForm;
