import _ from "lodash";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import pages from "../utils/pages.json";
import CartToggle from "./CartToggle";

export const linkClass = (pathname, linkedPage) => {
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

export default function DesktopNavigation() {
  let { pathname } = useRouter();

  let navPages = _.filter(pages, (page) => {
    return page.inMenu;
  });
  return (
    <nav className="navbar--desktop">
      <Link href="/">
        <a className="logo-link--desktop" title="Yankee Dahlia Society">
          <Image
            className="logo--desktop"
            src="/logo-header.svg"
            alt="YDS Logo"
            width="80"
            height="72"
          />
        </a>
      </Link>
      <ul className="navbar__main-menu-list--desktop">
        {_.map(navPages, (page, index) => (
          <li key={`${page.slug}-${index}`} className="navbar__item">
            <Link href={page.path}>
              <a className={linkClass(pathname, page)}>{page.label}</a>
            </Link>
          </li>
        ))}
        <li className="navbar__item">
          <CartToggle />
        </li>
      </ul>
    </nav>
  );
}
