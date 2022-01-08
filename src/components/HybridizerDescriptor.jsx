import Descriptor from './Descriptor';

const HybridizerDescriptor = ({hybridizer, introduction_year}) => {
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

export default HybridizerDescriptor;
