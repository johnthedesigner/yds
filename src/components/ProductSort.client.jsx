import {useServerState} from '@shopify/hydrogen/client';

const ProductSort = ({sortOption}) => {
  const {pending, setServerState} = useServerState();
  return (
    <div className="product-sort">
      <div className="product-sort__select-wrapper">
        <select
          className="product-sort__select"
          name="sort_key"
          onChange={(e) => {
            console.log(e.target.value);
            setServerState('sortOption', e.target.value);
          }}
          disabled={pending}
          value={sortOption}
        >
          <option value="titleAsc">Title (A–Z)</option>
          <option value="titleDesc">Title (Z–A)</option>
          <option value="priceAsc">Price (Lowest–Highest)</option>
          <option value="priceDesc">Price (Highest–Lowest)</option>
        </select>
      </div>
    </div>
  );
};

export default ProductSort;
