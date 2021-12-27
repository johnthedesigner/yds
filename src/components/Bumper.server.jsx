import {Link} from '@shopify/hydrogen/client';
// import Link from 'next/link';

const BumperLink = (props) => {
  if (props.buttonUrl) {
    return (
      <Link className="button" to={props.buttonUrl} title={props.buttonLabel}>
        {props.buttonLabel}
      </Link>
    );
  } else {
    return null;
  }
};

const BumperText = (props) => {
  if (props.text) {
    return <h3>{props.text}</h3>;
  } else {
    return null;
  }
};

const BumperSmallText = (props) => {
  if (props.text) {
    return <p>{props.text}</p>;
  } else {
    return null;
  }
};

const Bumper = (props) => {
  return (
    <div className="bumper">
      <BumperText text={props.text} />
      <BumperSmallText text={props.smallText} />
      <BumperLink buttonUrl={props.buttonUrl} buttonLabel={props.buttonLabel} />
    </div>
  );
};

export default Bumper;
