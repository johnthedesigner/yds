import _ from 'lodash';
import {useLocation} from 'react-router-dom';

import {Link} from '@shopify/hydrogen/client';
import pages from '../pages.json';

export const linkClass = (currentPath, linkedPage) => {
  let {pathname} = useLocation();
  let isHome = pathname === '/' && linkedPage.path === '/';
  if (linkedPage.path === '/') {
    return isHome ? 'navbar__link navbar__link--active' : 'navbar__link';
  } else {
    return linkedPage.path === pathname || _.includes(pathname, linkedPage.path)
      ? 'navbar__link navbar__link--active'
      : 'navbar__link';
  }
};

export default function Navigation({collections}) {
  let navPages = _.filter(pages, (page) => {
    return page.inMenu;
  });
  return (
    <nav className="navbar__main-menu--desktop">
      <ul className="navbar__main-menu-list--desktop">
        {_.map(navPages, (page, index) => (
          <li key={`${page.slug}-${index}`} className="navbar__item">
            <Link
              to={page.path}
              className={linkClass('props.currentPath', page)}
            >
              {page.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
