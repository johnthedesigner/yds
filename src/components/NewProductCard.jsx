// import locale from 'locale-codes';
import {
  MediaFileFragment,
  ProductProviderFragment,
  useShopQuery,
  flattenConnection,
  Product,
} from '@shopify/hydrogen';
import _ from 'lodash';
import {Link} from 'react-router-dom';

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

  const CountryFlag = ({product}) => {
    if (product.country_of_origin) {
      let countryString = product.country_of_origin.value.toLowerCase();
      let countryCode = 'us';
      //    Find a way to import with iso country codes or convert
      //   let countryCode = locale.where('location', countryString);
      //   console.log(locale, countryCode);
      return (
        <img
          className="product-grid__image-flag"
          src={`/flags/1x1/${countryCode}.svg`}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <Product product={product} initialVariantId={initialVariant.id}>
      <div className="product-grid__image">
        <Link
          className="product-grid__image-link"
          to={`/shop/products/${product.handle}`}
        >
          <Gallery />
        </Link>
        <div className="product-grid__image-overlay">
          <p className="product-grid__inventory">
            <small>
              <em>{product.totalInventory} left in stock.</em>
            </small>
          </p>
          <CountryFlag product={product} />
        </div>
      </div>
      <div className="product-grid__product-info">
        <div>
          <div className="product-grid__title-row">
            <Link
              className="product-grid__title-link"
              to={`/shop/product/${product.handle}`}
            >
              <Product.Title as="h1" className="product-grid__title" />
            </Link>
            <Product.SelectedVariant.Price
              className="product-grid__price"
              as="p"
            >
              <Price />
            </Product.SelectedVariant.Price>
          </div>
          <HybridizerYear
            hybridizer={product.hybridizer}
            introduction_year={product.introduction_year}
          />
          <TagDescriptor tag="form" label="Form" />
          <TagDescriptor tag="size" label="Size" />
          <TagDescriptor tag="color" label="Color" />
        </div>
      </div>
    </Product>
  );
};

export default ProductCard;
