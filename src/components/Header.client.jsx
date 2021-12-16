import _ from 'lodash';
import {useState} from 'react';
import {Link} from '@shopify/hydrogen/client';

import CartToggle from './CartToggle.client';
import Navigation from './Navigation.client';
import MobileNavigation from './MobileNavigation.client';

const CommerceNavbar = (props) => {
  if (props.isCommercePage) {
    let CollectionLinks = () => {
      return _.map(props.productTypes, (type, index) => {
        return (
          <li key={type.id} className="commerce-navbar__item">
            <Link
              to={`/category/${props.productTypeSlugs[index]}`}
              className="block p-4 hover:opacity-80"
            >
              {type}
            </Link>
          </li>
        );
      });
    };
    return (
      <nav className="commerce-navbar">
        <ul className="commerce-navbar__list">
          <CollectionLinks />
        </ul>
      </nav>
    );
  } else {
    return null;
  }
};

export default function Header({
  collections,
  storeName,
  isCommercePage,
  productTypes,
  productTypeSlugs,
}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header role="banner" className="header">
      <div>
        <MobileNavigation
          collections={collections}
          isOpen={isMobileNavOpen}
          setIsOpen={setIsMobileNavOpen}
        />
        <Link
          className="logo-link--desktop"
          to="/"
          title="Yankee Dahlia Society"
        >
          <img className="logo--desktop" src="/logo-desktop.svg" />
        </Link>
        <div className="navbar--desktop">
          <Navigation storeName={storeName} />
          <CartToggle
            handleClick={() => {
              if (isMobileNavOpen) setIsMobileNavOpen(false);
            }}
          />
        </div>
      </div>
      <CommerceNavbar
        isCommercePage={true}
        collections={collections}
        productTypes={productTypes}
        productTypeSlugs={productTypeSlugs}
      />
    </header>
  );
}
