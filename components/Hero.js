const Hero = (props) => {
  let styles = {
    backgroundImage: `url(${props.image})`,
    height: props.height || "14rem",
  };
  return (
    <div className="hero" style={styles}>
      <div className="hero__overlay"></div>
      <div className="hero__content">
        <h1 className="hero__title">{props.title}</h1>
      </div>
    </div>
  );
};

export default Hero;
