import Image from "next/image";

const Pingpong = (props) => {
  return (
    <div
      className={`pingpong pingpong--${
        props.side == "left" ? "left" : "right"
      }`}>
      <div className="pingpong__image">
        <Image
          src={props.image}
          width={props.ratioWidth || 1}
          height={props.ratioHeight || 1}
          alt={props.imageAlt}
          layout="responsive"
        />
      </div>
      <div className="pingpong__text">{props.children}</div>
    </div>
  );
};

export default Pingpong;
