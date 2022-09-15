import _ from "lodash";
import Link from "next/link";
import Image from "next/image";

import CartToggle from "./CartToggle";
import Navigation from "./Navigation";
import MobileNavigation from "./MobileNavigation";
import AuthMenu from "./AuthMenu";

const UserMenuBar = () => {
  return (
    <div className="user-menu-bar">
      <div className="user-menu-bar__item">
        <AuthMenu />
      </div>
    </div>
  );
};

export default function Header({ storeName }) {
  return (
    <>
      <header role="banner" className="header">
        <Link href="/">
          <a className="logo-link--desktop" title="Yankee Dahlia Society">
            <Image
              className="logo--desktop"
              src="/logo-desktop.svg"
              alt="YDS Logo"
              width="42"
              height="110"
            />
          </a>
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
