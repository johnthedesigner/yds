import {Link} from '@shopify/hydrogen/client';

import CartIcon from './CartIcon';
import OpenIcon from './OpenIcon';
import Header from './Header.client';

export default function LoadingFallback() {
  return (
    <>
      <header role="banner" className="header">
        <div>
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
          <div className="navbar--desktop">
            {/* <Navigation storeName={storeName} /> */}
            {/* <CartToggle
              handleClick={() => {
                if (isMobileNavOpen) setIsMobileNavOpen(false);
              }}
            /> */}
          </div>
        </div>
        {/* <CommerceNavbar
          isCommercePage={isCommercePage}
          collections={collections}
        /> */}
      </header>
    </>
  );
}
