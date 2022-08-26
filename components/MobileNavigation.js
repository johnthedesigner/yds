import _ from "lodash";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import pages from "../utils/pages.json";

export default function MobileNavigation({ isOpen, setIsOpen }) {
  // const OpenFocusTrap = isOpen ? FocusTrap : Fragment;
  const [menuOpen, setMenuOpen] = useState(false);
  let { pathname } = useRouter();
  let siteDomain = process.env.SITE_DOMAIN;

  const linkClass = (linkedPage) => {
    let isHome = pathname === "/" && linkedPage.path === "/";
    if (linkedPage.path === "/") {
      return isHome ? "navbar__link navbar__link--active" : "navbar__link";
    } else {
      return linkedPage.path === pathname ||
        _.startsWith(pathname, linkedPage.path)
        ? "navbar__link navbar__link--active"
        : "navbar__link";
    }
  };

  let Links = () => {
    return _.map(pages, (page) => {
      if (page.inMenu) {
        return (
          <li className="navbar__item" key={page.path}>
            <Link href={page.path}>
              <a className={linkClass(page)} title={page.title}>
                {page.label}
              </a>
            </Link>
          </li>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <nav className="navbar--mobile">
      <div className="menu__button">
        <img src="/hamburger.svg" onClick={() => setMenuOpen(!menuOpen)} />
      </div>
      <div
        className="navbar__list-container--mobile"
        style={{
          pointerEvents: menuOpen ? "all" : "none",
          opacity: menuOpen ? 1 : 0,
        }}
        onClick={() => setMenuOpen(!menuOpen)}>
        <ul className="navbar__list--mobile">
          <Links />
        </ul>
      </div>
    </nav>
  );
}
