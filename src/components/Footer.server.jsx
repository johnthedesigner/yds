import _ from 'lodash';
import {Link} from '@shopify/hydrogen';

import Donate from './Donate.client';
import pages from '../pages.json';

export default function Footer({collection, product}) {
  let linkClass = (currentPath, linkedPage) => {
    return linkedPage.path === currentPath
      ? 'footer__link footer__link--active'
      : 'footer__link';
  };

  let Links = (props) => {
    return _.map(pages, (page) => {
      if (page.inFooter) {
        return (
          <li className="footer__menu-item" key={page.path}>
            <Link
              to={page.path}
              className={linkClass(props.currentPath, page)}
              title={page.title}
            >
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
    <footer className="footer">
      <div className="footer__body">
        <img src="/logo-footer.svg" />
        <ul className="footer__menu">
          <Links />
          <li className="footer__menu-item">
            <a
              href="http://instagram.com/yankeedahliasociety"
              className="footer__social-icon"
              title="Yankee Dahlia Society on Instagram"
              target="_blank"
            >
              <img src="/icon-ig.svg" />
            </a>
            <a
              href="http://facebook.com/yankeedahliasociety"
              className="footer__social-icon"
              title="Yankee Dahlia Society on Facebook"
              target="_blank"
            >
              <img src="/icon-fb.svg" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCfr-8mV00MNqG4e9I_-Zw1Q"
              className="footer__social-icon"
              title="Yankee Dahlia Society on Youtube"
              target="_blank"
            >
              <img src="/icon-yt.svg" />
            </a>
          </li>
        </ul>
        <div className="donation-form__wrapper">
          <Donate />
        </div>
      </div>
      <div className="footer__bottom">
        <p className="footer__legal-text">
          Yankee Dahlia Society, 501(c)3 – © Copyright 2021 Yankee Dahlia
          Society
        </p>
      </div>
    </footer>
  );
}
