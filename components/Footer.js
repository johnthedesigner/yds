import _ from "lodash";
import Link from "next/link";

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
        <img src="/logo-footer.svg" />
        <ul className="footer__menu">
          <Links />
          <li className="footer__menu-item">
            <a
              href="http://instagram.com/yankeedahliasociety"
              className="footer__social-icon"
              title="Yankee Dahlia Society on Instagram"
              target="_blank">
              <img src="/icon-ig.svg" />
            </a>
            <a
              href="http://facebook.com/yankeedahliasociety"
              className="footer__social-icon"
              title="Yankee Dahlia Society on Facebook"
              target="_blank">
              <img src="/icon-fb.svg" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCfr-8mV00MNqG4e9I_-Zw1Q"
              className="footer__social-icon"
              title="Yankee Dahlia Society on Youtube"
              target="_blank">
              <img src="/icon-yt.svg" />
            </a>
          </li>
          <li className="footer__menu-item">
            <a
              href="https://smile.amazon.com/ch/86-2027288"
              className="footer__social-icon"
              title="Yankee Dahlia Society on Amazon Smile"
              target="_blank">
              <img src="/amazon-smile.svg" />
            </a>
          </li>
        </ul>
        {/* <div className="footer__amazon-smile">
          <h3>Raise Money for YDS With Every Amazon Purchase</h3>
          <p>
            Yankee Dahlia Society works with the Amazon Smile program. Click the
            link below and have Amazon donate 0.5% of your qualifying Amazon
            Purchases to Yankeed Dahlia Society and help us to continue putting
            on fun events, workshops and programs for our members.
          </p>
        </div> */}
        <div className="donation-form__wrapper">
          <Donate />
          <br />
          <br />
          <br />
          <h3>Raise Money for YDS With Every Amazon Purchase</h3>
          <p>
            Yankee Dahlia Society participates in the Amazon Smile program.
            Click the link below and have Amazon donate 0.5% of your qualifying
            Amazon Purchases to Yankee Dahlia Society and help us to continue
            putting on fun events, workshops and programs for the club.
          </p>
          <br />
          <a
            className="button"
            href="https://smile.amazon.com/ch/86-2027288"
            target="_blank">
            YDS on Amazon Smile
          </a>
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
