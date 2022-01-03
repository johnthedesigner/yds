import {
  MediaFileFragment,
  ProductProviderFragment,
  useShopQuery,
  flattenConnection,
  Product,
} from '@shopify/hydrogen';
import _ from 'lodash';
import Gallery from './Gallery.client';

const ProductCard = ({product}) => {
  let initialVariant = flattenConnection(product.variants)[0];
  let {key, value} = product;

  const Price = ({currencyCode, amount, currencyNarrowSymbol}) => {
    return `${currencyNarrowSymbol}${amount}`;
  };

  const Descriptor = ({label, value}) => {
    return (
      <div className="descriptor">
        <div className="descriptor__key">{label}</div>
        <div className="descriptor__value">{value}</div>
      </div>
    );
  };

  const TagDescriptor = ({tag, label}) => {
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

  const HybridizerYear = ({hybridizer, introduction_year}) => {
    if (hybridizer && introduction_year) {
      return (
        <Descriptor
          label="Hybridizer"
          value={`${hybridizer.value}(${introduction_year.value})`}
        />
      );
    } else if (hybridizer) {
      return <Descriptor label="Hybridizer" value={hybridizer.value} />;
    } else {
      return null;
    }
  };

  const ProductDescriptor = ({fieldKey, product, label}) => {
    if (product[fieldKey]) {
      return <div>{`${label}: ${product[fieldKey].value}`}</div>;
    } else {
      return null;
    }
  };

  return (
    <Product product={product} initialVariantId={initialVariant.id}>
      <div className="product-grid__image">
        <Gallery />
      </div>
      <div className="product-grid__product-info">
        <div>
          <Product.Title as="h1" className="product-grid__title" />
          <Product.SelectedVariant.Price className="product-grid__price" as="p">
            <Price />
          </Product.SelectedVariant.Price>
          <p>
            <small>
              <em>{product.totalInventory} left in stock.</em>
            </small>
          </p>
          <p className="product-grid__product-descriptor">
            <HybridizerYear
              hybridizer={product.hybridizer}
              introduction_year={product.introduction_year}
            />
            <TagDescriptor tag="form" label="Form" />
            <TagDescriptor tag="size" label="Size" />
            <TagDescriptor tag="color" label="Color" />
            <ProductDescriptor
              label="Country of Origin"
              fieldKey="country_of_origin"
              product={product}
            />
          </p>
        </div>
      </div>
    </Product>
  );
};

export default ProductCard;
