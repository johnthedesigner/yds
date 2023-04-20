import _ from "lodash";
import Link from "next/link";
import Image from "next/image";

import Donate from "./Donate";
import pages from "../utils/pages.json";

export default function Footer({ collection, product }) {
  let linkClass = (currentPath, linkedPage) => {
    return linkedPage.path === currentPath
      ? "footer__link footer__link--active"
      : "footer__link";
  };

  let Links = (props) => {
    return _.map(pages, (page) => {
      if (page.inFooter) {
        return (
          <li className="footer__menu-item" key={page.path}>
            <Link
              href={page.path}
              className={linkClass(props.currentPath, page)}
              title={page.title}>
              <a>{page.label}</a>
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
        <Image src="/logo-footer.svg" alt="YDS Logo" width="77" height="202" />
        <ul className="footer__menu">
          <Links />
          <li className="footer__menu-item">
            <a
              href="http://instagram.com/yankeedahliasociety"
              className="footer__social-icon"
              title="Yankee Dahlia Society on Instagram"
              target="_blank"
              rel="noreferrer">
              <Image
                src="/icon-ig.svg"
                alt="Instagram Logo"
                width="24"
                height="24"
              />
            </a>
            <a
              href="http://facebook.com/yankeedahliasociety"
              className="footer__social-icon"
              title="Yankee Dahlia Society on Facebook"
              target="_blank"
              rel="noreferrer">
              <Image
                src="/icon-fb.svg"
                alt="Facebook Logo"
                width="24"
                height="24"
              />
            </a>
            <a
              href="https://www.youtube.com/channel/UCfr-8mV00MNqG4e9I_-Zw1Q"
              className="footer__social-icon"
              title="Yankee Dahlia Society on Youtube"
              target="_blank"
              rel="noreferrer">
              <Image
                src="/icon-yt.svg"
                alt="Youtube Logo"
                width="24"
                height="24"
              />
            </a>
          </li>
        </ul>
        <div className="donation-form__wrapper">
          <Donate />
        </div>
      </div>
      <div className="footer__bottom">
        <p className="footer__legal-text">
          Yankee Dahlia Society, 501(c)3 - © Copyright 2021 Yankee Dahlia
          Society
        </p>
      </div>
    </footer>
  );
}
