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

export default function Header({storeName}) {
  return (
    <>
      <header role="banner" className="header">
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
        </div>
        <div className="navbar--mobile">
          <MobileNavigation />
        </div>
      </header>
      <div className="header-spacer" />
    </>
  );
}
