import _ from 'lodash';

import {Link} from '@shopify/hydrogen/client';
import pages from '../pages.json';

export const linkClass = (currentPath, linkedPage) => {
  return linkedPage.path === currentPath
    ? 'navbar__link navbar__link--active'
    : 'navbar__link';
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
