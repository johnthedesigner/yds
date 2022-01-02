import _ from 'lodash';
import {useState} from 'react';
import {Link} from '@shopify/hydrogen/client';

import CartToggle from './CartToggle.client';
import Navigation from './Navigation.client';
import MobileNavigation from './MobileNavigation.client';
import AuthMenu from './AuthMenu.client';

const UserMenuBar = () => {
  return (
    <div className="user-menu-bar">
      <div className="user-menu-bar__item">
        <AuthMenu />
      </div>
      <div className="user-menu-bar__item">
        <CartToggle
          handleClick={() => {
            if (isMobileNavOpen) setIsMobileNavOpen(false);
          }}
        />
      </div>
    </div>
  );
};

const CommerceNavbar = (props) => {
  if (props.isCommercePage) {
    let CollectionLinks = () => {
      return _.map(props.productTypes, (type, index) => {
        return (
          <li
            key={props.productTypeSlugs[index]}
            className="commerce-navbar__item"
          >
            <Link to={`/shop/${props.productTypeSlugs[index]}`}>{type}</Link>
          </li>
        );
      });
    };
    return (
      <nav className="commerce-navbar">
        <ul className="commerce-navbar__list">
          {/* <CollectionLinks /> */}
          <li className="commerce-navbar__item">
            <AuthMenu />
          </li>
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
    <>
      <header role="banner" className="header">
        {/* <MobileNavigation
        collections={collections}
        isOpen={isMobileNavOpen}
        setIsOpen={setIsMobileNavOpen}
      /> */}
        <Link
          className="logo-link--desktop"
          to="/"
          title="Yankee Dahlia Society"
        >
          <img className="logo--desktop" src="/logo-desktop.svg" />
        </Link>
        <UserMenuBar />
        <div className="navbar--desktop">
          <Navigation storeName={storeName} />
          {/* <CartToggle
            handleClick={() => {
              if (isMobileNavOpen) setIsMobileNavOpen(false);
            }}
          /> */}
        </div>
        {/* <CommerceNavbar
          isCommercePage={true}
          collections={collections}
          productTypes={productTypes}
          productTypeSlugs={productTypeSlugs}
        /> */}
      </header>
      <div className="header-spacer" />
    </>
  );
}
