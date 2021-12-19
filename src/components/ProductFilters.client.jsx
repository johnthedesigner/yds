import _ from 'lodash';
import {useServerState} from '@shopify/hydrogen/client';

const ProductFilters = ({options, selected}) => {
  const {setServerState} = useServerState();

  return (
    <div className="product-filters">
      {_.map(options, (option, optionKey) => {
        return (
          <div key={optionKey} className="product-filters__set">
            {_.map(option, (facet, facetKey) => {
              let tag = `${optionKey}-${facetKey}`;
              return (
                <div key={facetKey} className="product-filters__facet">
                  <input
                    type="checkbox"
                    value={_.includes(selected, tag)}
                    onClick={() => {
                      setServerState('selectedOptions', _.xor([tag], selected));
                    }}
                  />
                  {facet}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ProductFilters;
