import _ from "lodash";

const Descriptor = ({ label, value }) => {
  return (
    <div className="descriptor">
      <div className="descriptor__key">{label}</div>
      <div className="descriptor__value">{value}</div>
    </div>
  );
};

export const TagDescriptor = ({ tag, label, product }) => {
  let tagString = _.find(product.tags, (productTag) => {
    return _.includes(productTag, tag);
  });
  if (tagString) {
    let value = tagString.split("-")[1];
    return <Descriptor label={label} value={value} />;
  } else {
    return null;
  }
};

export const HybridizerDescriptor = ({ hybridizer, introduction_year }) => {
  if (hybridizer && introduction_year) {
    return (
      <Descriptor
        label="Hybridizer"
        value={`${hybridizer.value} (${introduction_year.value})`}
      />
    );
  } else if (hybridizer) {
    return <Descriptor label="Hybridizer" value={hybridizer.value} />;
  } else {
    return null;
  }
};
