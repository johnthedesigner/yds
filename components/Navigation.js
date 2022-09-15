import _ from "lodash";
import { useRouter } from "next/router";
import Link from "next/link";

import pages from "../utils/pages.json";
import CartToggle from "./CartToggle";

export const linkClass = (currentPath, linkedPage) => {
  let { pathname } = useRouter();
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

export default function Navigation({ collections }) {
  let navPages = _.filter(pages, (page) => {
    return page.inMenu;
  });
  return (
    <nav className="navbar__main-menu--desktop">
      <ul className="navbar__main-menu-list--desktop">
        {_.map(navPages, (page, index) => (
          <li key={`${page.slug}-${index}`} className="navbar__item">
            <Link href={page.path}>
              <a className={linkClass("props.currentPath", page)}>
                {page.label}
              </a>
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
