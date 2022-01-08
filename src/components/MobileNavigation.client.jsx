import _ from 'lodash';
import {Link} from '@shopify/hydrogen/client';
import {useState} from 'react';
import {useLocation} from 'react-router-dom';

import pages from '../pages.json';
import shopifyConfig from '../../shopify.config';

export default function MobileNavigation({isOpen, setIsOpen}) {
  // const OpenFocusTrap = isOpen ? FocusTrap : Fragment;
  const [menuOpen, setMenuOpen] = useState(false);
  let {pathname} = useLocation();
  let {siteDomain} = shopifyConfig;

  const linkClass = (linkedPage) => {
    let isHome = pathname === '/' && linkedPage.path === '/';
    if (linkedPage.path === '/') {
      return isHome ? 'navbar__link navbar__link--active' : 'navbar__link';
    } else {
      return linkedPage.path === pathname ||
        _.startsWith(pathname, linkedPage.path)
        ? 'navbar__link navbar__link--active'
        : 'navbar__link';
    }
  };

  let Links = () => {
    return _.map(pages, (page) => {
      if (page.inMenu) {
        return (
          <li className="navbar__item" key={page.path}>
            <Link to={page.path} className={linkClass(page)} title={page.title}>
              {page.label}
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
          pointerEvents: menuOpen ? 'all' : 'none',
          opacity: menuOpen ? 1 : 0,
        }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <ul className="navbar__list--mobile">
          <Links />
        </ul>
      </div>
    </nav>
  );
}
