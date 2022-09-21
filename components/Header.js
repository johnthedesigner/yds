import _ from "lodash";
import Link from "next/link";
import Image from "next/image";

import CartToggle from "./CartToggle";
import DesktopNavigation from "./DesktopNavigation";
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
        <UserMenuBar />
        <div className="navbar">
          <DesktopNavigation storeName={storeName} />
          <MobileNavigation storeName={storeName} />
        </div>
      </header>
      <div className="header-spacer" />
    </>
  );
}
