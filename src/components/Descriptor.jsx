const Descriptor = ({label, value}) => {
  return (
    <div className="descriptor">
      <div className="descriptor__key">{label}</div>
      <div className="descriptor__value">{value}</div>
    </div>
  );
};

export default Descriptor;
