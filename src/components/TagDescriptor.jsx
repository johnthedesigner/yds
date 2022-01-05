import _ from 'lodash';

import Descriptor from './Descriptor';

const TagDescriptor = ({tag, label, product}) => {
  let tagString = _.find(product.tags, (productTag) => {
    return _.includes(productTag, tag);
  });
  if (tagString) {
    let value = tagString.split('-')[1];
    return <Descriptor label={label} value={value} />;
  } else {
    return null;
  }
};

export default TagDescriptor;
